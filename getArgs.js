const getAuthorArg = require('./getAuthorArg');
const getExclusionsArg = require('./getExclusionsArg');
const getGenreArg = require('./getGenreArg');
const getPublishedArg = require('./getPublishedArg');
const getRatingsArg = require('./getRatingArg');
const getSystemArg = require('./getSystemArg');
const getTagArg = require('./getTagArg');
const getTotalRatingsArg = require('./getTotalRatingsArg');

module.exports = ({
  author,
  exclusions,
  genre,
  published,
  ratings,
  ratingsDeviance,
  search = '',
  system,
  tag,
  totalRatings,
  totalReviews,
}) => {
  let str = search;

  if (exclusions) {
    str += getExclusionsArg(exclusions);
  }

  if (author) {
    str += getAuthorArg(author);
  }

  if (genre) {
    str += getGenreArg(genre);
  }

  if (published) {
    str += getPublishedArg(published);
  }

  if (ratings) {
    str += getRatingsArg(ratings);
  }

  if (ratingsDeviance) {
    str += getRatingsArg(ratingsDeviance);
  }

  if (system) {
    str += getSystemArg(system);
  }

  if (tag) {
    str += getTagArg(tag);
  }

  if (totalRatings) {
    str += getTotalRatingsArg(totalRatings);
  }

  if (totalReviews) {
    str += getTotalReviewsArg(totalReviews);
  }

  return str.trim();
};
