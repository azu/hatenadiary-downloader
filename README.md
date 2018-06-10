# hatenadiary-downloader

はてなダイアリーの記事を一括ダウンロードするツール。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install hatenadiary-downloader -g
    # or
    npx hatenadiary-downloader [option]

Requirement:

- Node.js 10+

## Usage

    Usage
      $ hatenadiary-downloader <URL>

    Options:
      --sortOrder "ascending" or "descending" (default: ascending)
      --output -o  output path

    Examples
      $ hatenadiary-downloader "http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]" -o ./index.html

### Examples

特定のダイアリーをすべてダウンロード

    hatenadiary-downloader "http://d.hatena.ne.jp/hatenadiary/" -o ./index.html

特定のダイアリーの特定のカテゴリのみをダウンロード

    hatenadiary-downloader "http://d.hatena.ne.jp/t-wada/searchdiary?word=*[XP]" -o ./index.html

## Changelog

See [Releases page](https://github.com/azu/hatenadiary-downloader/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/hatenadiary-downloader/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

## Thanks

- [neue cc - はてなダイアリー to HTML](http://neue.cc/2010/03/09_246.html)
