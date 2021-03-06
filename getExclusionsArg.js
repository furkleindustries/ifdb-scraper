const getAuthorArg = require('./getAuthorArg');
const getGenreArg = require('./getGenreArg');
const getPublishedArg = require('./getPublishedArg');
const getRatingsArg = require('./getRatingArg');
const getSystemArg = require('./getSystemArg');
const getTagArg = require('./getTagArg');
const getTotalRatingsArg = require('./getTotalRatingsArg');
const getTotalReviewsArg = require('./getTotalReviewsArg');

module.exports = ({
  author,
  genres,
  published,
  rating,
  search,
  system,
  tag,
  totalRatings,
  totalReviews,
}) => {
  let str = '';

  if (search) {
    str += `-${search} `;
  }

  if (author) {
    str += `-${getAuthorArg(author)} `;
  }

  if (genre) {
    str += `-${getGenreArg(genres)} `;
  }

  if (published) {
    str += `-${getPublishedArg(published)} `;
  }

  if (rating) {
    str += `-${getRatingsArg(rating)} `;
  }

  if (system) {
    str += `-${getSystemArg(system)} `;
  }

  if (tag) {
    str += `-${getTagArg(tag)} `;
  }

  if (totalRatings) {
    str += `-${getTotalRatingsArg(totalRatings)} `;
  }

  if (totalReviews) {
    str += `-${getTotalReviewsArg(totalReviews)} `;
  }

  return str;
};
