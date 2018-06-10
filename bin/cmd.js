#!/usr/bin/env node
"use strict";
const meow = require("meow");
const runner = require("../src/cli.js").cli;
const cli = meow(
    `
    Usage
      $ hatenadiary-downloader <URL>

    Options:
      --sortOrder "ascending" or "descending" (default: ascending)
      --output -o  output path

    Examples
      $ hatenadiary-downloader "http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]" -o ./index.html
`,
    {
        autoHelp: true,
        flags: {
            output: {
                alias: "o",
                type: "string"
            },
            sortOrder: {
                type: "string"
            }
        }
    }
);


runner.run(cli.input[0], cli.flags.output, cli.flags.sortOrder)
    .then(() => {
        console.log("Output: " + cli.flags.output);
    })
    .catch(error => {
        console.error(error);
    });

