// MIT © 2018 azu
"use strict";
const { createFetchReader, parseContents, joinArticleContents, getPrevArticleListURL } = require("./hatenadiary-downloader.js");
const fs = require("fs");
const path = require("path");
const assert = require("assert");
let cli = {
    /**
     * @param {string} URL hatena diary URL
     * @param {string } outputPath output Ptah
     * @param {string } [sortOrder] ascending or descending
     */
    async run(URL, outputPath, sortOrder = "ascending") {
        assert.ok(URL !== undefined, "URL needed");
        assert.ok(outputPath !== undefined, "--output is needed");
        const allContents = [];
        let lastDocument = null;
        const fetchAsyncIterator = createFetchReader(URL, {
            intervalTimeMs: 1000
        });
        for await (const document of fetchAsyncIterator) {
            console.log("Process: " + document.location.href);
            lastDocument = document;
            if (sortOrder === "ascending") {
                allContents.push(parseContents(document).reverse());
            } else {
                allContents.push(parseContents(document));
            }

        }
        if (sortOrder === "ascending") {
            allContents.reverse();
        }
        const indexContent = joinArticleContents(lastDocument, allContents);
        fs.writeFileSync(path.resolve(process.cwd(), outputPath), indexContent, "utf-8");
    }
};
module.exports.cli = cli;
