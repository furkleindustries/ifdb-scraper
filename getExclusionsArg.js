const getAuthorsArg = require('./getAuthorsArg');
const getGenresArg = require('./getGenresArg');
const getPublishedArg = require('./getPublishedArg');
const getRatingsArg = require('./getRatingsArg');
const getSystemsArg = require('./getSystemsArg');
const getTagsArg = require('./getTagsArg');
const getTotalRatingsArg = require('./getTotalRatingsArg');
const oneOrArrayToArray = require('./oneOrArrayToArray');

module.exports = ({
  authors,
  genres,
  published,
  ratings,
  search,
  systems,
  tags,
  totalRatings,
}) => {
  let str = '';

  if (search) {
    str += `-${search} `;
  }

  if (authors) {
    str += `-${getAuthorsArg(oneOrArrayToArray(authors))} `;
  }

  if (genres) {
    str += `-${getGenresArg(oneOrArrayToArray(genres))} `;
  }

  if (published) {
    str += `-${getPublishedArg(oneOrArrayToArray(published))} `;
  }

  if (ratings) {
    str += `-${getRatingsArg(oneOrArrayToArray(ratings))} `;
  }

  if (systems) {
    str += `-${getSystemsArg(oneOrArrayToArray(systems))} `;
  }

  if (tags) {
    str += `-${getTagsArg(oneOrArrayToArray(tags))} `;
  }

  if (totalRatings) {
    str += `-${getTotalRatingsArg(oneOrArrayToArray(totalRatings))} `;
  }

  return str;
};
