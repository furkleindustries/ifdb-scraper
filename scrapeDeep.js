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

      const detailsElems = $('.indented .notes');
      if (!detailsElems.length) {
        return reject(`No details pane. Cannot deep-parse entry at ${apiUrl}/${elem.find('a').attr('href')}`);
      }

      const starRatingContainer = $('td > p + p img');
      const ratingAttr = starRatingContainer.attr('title');
      const approximateRating = ratingAttr ? Number(
        /\.|½/.test(ratingAttr[1]) ? `${ratingAttr[0]}.5` : ratingAttr[0]
      ) : null;

      const totalRatings = Number(
        $('a[title^="View all ratings and reviews"]')
          .text()
          .split(' ')[0]
      );

      const totalReviews = Number($('a[href="#memberReviews"]').text().split(' ')[0]);

      let ifid;
      let firstPublicationDate;
      let language;
      let system;

      const details = detailsElems
        .text()
        .split(/\s\s/)
        .filter(Boolean)
        .map((aa) => aa.trim());

      details.forEach((line) => {
        if (/^Development system: /i.test(line)) {
          system = line.slice(20);
        } else if (/^First Publication Date: /i.test(line)) {
          firstPublicationDate = line.slice(24);
        } else if (/^Language: /i.test(line)) {
          language = line.slice(10);
        } else if (/^IFID: /i.test(line)) {
          ifid = line.slice(6);
        }
      });

      const ret = {
        approximateRating,
        downloads,
        firstPublicationDate,
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
