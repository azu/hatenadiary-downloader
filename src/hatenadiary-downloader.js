// MIT © 2018 azu
"use strict";
const JSDOM = require("jsdom").JSDOM;
const { html, safeHtml } = require('common-tags');
const stripScripts = (element) => {
    const scripts = element.getElementsByTagName('script');
    let i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    return element;
};
const makeAbsolute = (element) => {
    Array.from(element.querySelectorAll("a"), (linkNode) =>{
        const url = linkNode.href;
        
    })
};


const parseContents = (document) => {
    return Array.from(document.querySelectorAll("div.day"), (articleDOM) => {
        return stripScripts(articleDOM).outerHTML;
    });
};

const getPrevArticleListURL = (document) => {
    const linkNode = document.querySelector(`link[rel="prev"]`);
    if (!linkNode) {return null;}
    return linkNode.href;
};

const joinArticleContents = (document, contents) => {
    const title = document.title;
    const startNode = document.querySelector(`link[rel="start"]`);
    const URL = startNode.href;
    const styleSheets = document.querySelectorAll(`link[rel="stylesheet"]`);
    const styleSheetLinks = Array.from(styleSheets, (node) => {
        return node.outerHTML;
    });
    return html`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${safeHtml`${title}`}</title>
    ${styleSheetLinks.join("\n")}
</head>
<body>
<h1><a href="${URL}">${safeHtml`${title}`}</a></h1>
${contents.join("\n")}
</body>
</html>
`
};

const fetchDocument = (URL) => {
    return JSDOM.fromURL(URL, {
        userAgent: "hatenadiary-downloader+",
    }).then(dom => {
        return dom.window.document;
    });
};
const waitPromise = (timeMs) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMs);
    })
};
/**
 * Return asyncIterator for fetch article list
 * @param URL
 * @param intervalTimeMs
 * @returns {{[Symbol.asyncIterator]: (function(): {next(): Promise<*>})}}
 */
const createFetchReader = (URL, { intervalTimeMs }) => {
    let prevURL = URL;
    return {
        [Symbol.asyncIterator]: () => {
            return {
                async next() {
                    await waitPromise(intervalTimeMs);
                    const currentURL = prevURL;
                    if (!currentURL) {
                        return { done: true }
                    }
                    const document = await fetchDocument(currentURL);
                    prevURL = getPrevArticleListURL(document);
                    return {
                        done: false,
                        value: document
                    }
                }
            }
        }
    }
};

module.exports.parseContents = parseContents;
module.exports.getPrevArticleListURL = getPrevArticleListURL;
module.exports.joinArticleContents = joinArticleContents;
module.exports.fetchDocument = fetchDocument;
module.exports.createFetchReader = createFetchReader;
