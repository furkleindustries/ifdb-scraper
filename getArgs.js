const getAuthorsArg = require('./getAuthorsArg');
const getExclusionsArg = require('./getExclusionsArg');
const getGenresArg = require('./getGenresArg');
const getPublishedArg = require('./getPublishedArg');
const getRatingsArg = require('./getRatingsArg');
const getSystemsArg = require('./getSystemsArg');
const getTagsArg = require('./getTagsArg');
const getTotalRatingsArg = require('./getTotalRatingsArg');

module.exports = ({
  authors,
  exclusions,
  genres,
  published,
  ratings,
  ratingsDeviance,
  search = '',
  systems,
  tags,
  totalRatings,
  totalReviews,
}) => {
  let str = search;

  if (exclusions) {
    str += getExclusionsArg(exclusions);
  }

  if (authors) {
    str += getAuthorsArg(authors.split(','));
  }

  if (genres) {
    str += getGenresArg(genres.split(','));
  }
  
  if (published) {
    str += getPublishedArg(published.split(','));
  }
  
  if (ratings) {
    str += getRatingsArg(ratings.split(','));
  }

  if (ratingsDeviance) {
    str += getRatingsArg(ratingsDeviance.split(','));
  }

  if (systems) {
    str += getSystemsArg(systems.split(','));
  }

  if (tags) {
    str += getTagsArg(tags.split(','));
  }

  if (totalRatings) {
    str += getTotalRatingsArg(totalRatings.split(','));
  }

  if (totalReviews) {
    str += getTotalReviewsArg(totalReviews.split(','));
  }

  return str.trim();
};
