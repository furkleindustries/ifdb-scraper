const allScrapingCompleteSymbol = require('./allScrapingCompleteSymbol');
const apiUrl = require('./apiUrl');
const $ = require('cheerio');
const {
  writeFile,
} = require('fs-extra');
const getArgs = require('./getArgs');
const handleIfdbResponse = require('./handleIfdbResponse');
const {
  get,
} = require('https');

module.exports = async ({
  search,
  ...args
}) => {
  let argStr = `?searchfor=${search || ''}`;
  const rest = getArgs({ ...args });

  argStr += search && rest ? ` ${rest}` : rest;

  const baseUrl = `${apiUrl}/search/${argStr}`;
  let ongoing = true;
  let page = 1;
  let outputs = [];
  while (ongoing) {
    if (args.verbose) {
      console.log(`Scraping ${encodeURI(baseUrl)}&pg=${page}...`);
    }

    await new Promise((resolve, reject) => get(
      `${encodeURI(baseUrl)}&pg=${page}`,
      (res) => handleIfdbResponse(res).then(
        (data) => {
          if (data === allScrapingCompleteSymbol) {
            ongoing = false;
          } else {
            outputs.push(data);
            page += 1;
          }

          return resolve();
        },

        (err) => {
          ongoing = false;
          return reject(err);
        },
      ),
    ));
  }

  const flattened = outputs.reduce((arr, item) => arr.concat(item), []);

  if (args.outFile) {
    writeFile(args.outFile, JSON.stringify(flattened, null, 2));
  }

  return flattened;
};
