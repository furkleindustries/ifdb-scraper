const apiUrl = require('./apiUrl');
const cheerio = require('cheerio');
const {
  get,
} = require('https');
const iconvLite = require('iconv-lite');

module.exports = (elem, verbose) => new Promise((resolve, reject) => get(
  `${apiUrl}/${elem.find('a').attr('href')}`,
  (res) => {
    if (verbose) {
      console.log(`Deep-scraping ${apiUrl}/${elem.find('a').attr('href')}...`);
    }

    let doc = '';
    res.on('error', reject);
    res.on('data', (data) => doc += iconvLite.decode(data, 'ISO-8859-1'));
    res.on('close', () => {
      const $ = cheerio.load(doc);

      const downloadElems = $('.downloaditem');
      const downloads = [];
      downloadElems.each((index, _dli) => {
        const dli = $(_dli);
        downloads.push({
          href: $(dli.find('a').get(0)).attr('href'),
          note: dli.find('.dlnotes').text(),
          type: $(dli.find('a').get(0)).text(),
        });
      });

      const details = $('.indented .notes');
      if (!details.length) {
        console.error(doc, `${apiUrl}/${elem.find('a').attr('href')}`);
        return reject('No details pane. Cannot deep-parse entry.');
      }

      const firstDetail = $(details.get(0));
      const ifidRaw = $(details.get(1)).text().match(/IFID: (\S+)/);
      const ifid = (!ifidRaw || ifidRaw[1] === 'Unknown') ? null : ifidRaw[1];
      const languageRaw = firstDetail.text().match(/Language: (\S+ \(.+\))/);
      const language = languageRaw ? languageRaw[1] : null;
      const systemRaw = firstDetail.text().match(/Development System: (\S+)/);
      const system = systemRaw ? systemRaw[1] : null;
      const ret = {
        downloads,
        ifid,
        language,
        system,
      };

      return resolve(ret);
    })
  },
));
