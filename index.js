const apiUrl = require('./apiUrl');
const $ = require('cheerio');
const getYearsArg = require('./getYearsArg');
const {
  get,
} = require('https');

module.exports = async ({
  authors,
  exclusions: {
    authors: excludedAuthors,
    genres: excludedGenres,
    ratings: excludedRatings,
    search: excludedSearch,
    systems: excludedSystems,
    tags: excludedTags,
    totalRatings: excludedTotalRatings,
    years: excludedYears,
  },

  genres,
  ratings,
  search,
  systems,
  tags,
  totalRatings,
  years,
}) => {
  if (!search) {
    throw new Error('No search argument was provided.');
  }

  let baseUrl = `${apiUrl}?searchfor=${search}`;
  let req;
  let ongoing = true;
  if (Array.isArray(years)) {
    baseUrl += getYearsArg(years);
  }

  let page = 0;
  while (ongoing) {
    const req = get(`${apiUrl}&pg=${page}`, ({
      on,
    }) => {
      on('data', console.log.bind(console));
    });
  }
};
