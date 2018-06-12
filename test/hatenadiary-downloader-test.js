const assert = require("assert").strict;
const { fetchDocument, parseContents, createFetchReader, joinArticleContents, getPrevArticleListURL } = require("../src/hatenadiary-downloader.js");

describe("hatenadiary-downloader", () => {
    it("should fetch article list and prev url", async () => {
        const document = await fetchDocument("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]");
        const prevURL = getPrevArticleListURL(document);
        assert.equal(prevURL, "http://d.hatena.ne.jp/t-wada/searchdiary?of=3&word=%2A%5BXP%5D");
    });
    it("should fetch and parse contents", async () => {
        const document = await fetchDocument("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]");
        const contents = parseContents(document);
        contents.forEach(content => {
            assert.ok(content.includes(`div class="day"`));
        });
    });
    it("should fetch and return joined contents", async () => {
        const document = await fetchDocument("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]");
        const contents = parseContents(document);
        const html = joinArticleContents(document, contents);
        assert.ok(html.includes("html"));
    });
    it("should async iterator for createFetchReader", async () => {
        const iterator = createFetchReader("http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]", {
            intervalTimeMs: 100
        });
        let count = 0;
        const URLs = [];
        for await (const document of iterator) {
            count++;
            URLs.push(document.location.href);
            if (count > 3) {
                break;
            }
        }
        assert.ok(count, 3);
        assert.deepEqual(URLs, [
            'http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]',
            'http://d.hatena.ne.jp/t-wada/searchdiary?of=3&word=%2A%5BXP%5D',
            'http://d.hatena.ne.jp/t-wada/searchdiary?of=6&word=%2A%5BXP%5D',
            'http://d.hatena.ne.jp/t-wada/searchdiary?of=9&word=%2A%5BXP%5D'
        ]);
    });
});
