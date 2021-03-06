const allScrapingCompleteSymbol = require('./allScrapingCompleteSymbol');
const apiUrl = require('./apiUrl');
const cheerio = require('cheerio');
const iconvLite = require('iconv-lite');
const scrapeDeep = require('./scrapeDeep');

module.exports = (res, deep, verbose) => {
  let doc = '';
  let outputs = [];
  return new Promise((resolve, reject) => {
    res.on('error', reject);
    res.on('data', (data) => doc += iconvLite.decode(data, 'ISO-8859-1'));
    res.on('close', async () => {
      const $ = cheerio.load(doc);
      const entries = $('.main > p');

      if (!entries.length) {
        return resolve(allScrapingCompleteSymbol);
      }

      const proms = entries.map((index, el) => (
        new Promise(async (resolve, reject) => {
          const elem = $(el);
          if (!elem) {
            return reject(`The element was not valid.`);
          }

          const img = elem.find('img');
          const imgAttr = img.attr('src');
          const fallback = 'NO AUTHOR AVAILABLE';
          const text = elem.text();

          let matched;
          if (img.length && imgAttr) {
            if (imgAttr === '/blank.gif') {
              matched = text.match(/by\s(.+?)\s*\((\d{4})/);
            } else if (/\d{4}\s*$/.test(text)) {
              matched = text.match(/by\s(.+)(\d{4})/);
            } else {
              matched = text.match(/by\s(.+)/);
            }
          } else if (/\)\s*$/.test(text)) {
            matched = text.match(/by\s(.+)\s\((\d{4})/);
          } else {
            matched = text.match(/by\s(.+)/);
          }

          const author = (matched || [])[1];
          const published = (matched || [])[2];
          
          const href = elem.find('a').attr('href') || '';
          const id = (href.match(/id=(.+)$/) || [])[1];

          /* Slow down the requests a bit to stop rate-limiting. */
          const deepProps = deep ? await scrapeDeep(elem, verbose) || {} : {};

          outputs.push({
            author: (author || fallback).trim(),
            id: id || null,
            img: !imgAttr || imgAttr === '/blank.gif' ?
              null :
              `${apiUrl}/${imgAttr}` || null,

            link: (href && `${apiUrl}/${href}`) || null,
            published: (published || '0000').trim(),
            title: elem.find('b').text(),
            ...deepProps,
          });

          await new Promise((resolve) => setTimeout(resolve, 4000));

          return resolve();
        })
      )).get();

      await Promise.all(proms);

      return resolve(outputs);
    });
  });
};
