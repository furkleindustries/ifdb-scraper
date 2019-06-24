const cheerio = require('cheerio');
const {
  get,
} = require('https');

module.exports = (elem) => new Promise((resolve, reject) => get(
  elem.find('a').attr('href'),
  (res) => {
    res.on('error', reject);
    res.on('data', (data) => {
      const $ = cheerio.load(data);

      const downloads = $('.downloaditem').map((dli) => ({
        href: dli.find('a').get(0).attr('href'),
        type: dli.find('a').get(0).text(),
        note: dli.find('.dlnotes').text(),
      }));

      const details = $('.indented .notes');
      const ifidRaw = details.get(1).find('i').text();
      const ifid = ifidRaw === 'Unknown' ? null : ifidRaw;
      const language = details.get(0).text().match(/: (.+?)\s\s/)[1];
      const system = details.get(0).text().match(/: (.+?)\s*$/)[1];

      const ret = {
        downloads,
        ifid,
        language,
        system,
        totalRatings,
        totalReviews,
      };

      return resolve(ret);
    });
  },
));
