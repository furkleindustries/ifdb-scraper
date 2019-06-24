const validateRange = require('./validateRange');

module.exports = (totalReviews) => totalReviews.reduce((str, val) => (
  `${str} #reviews:${validateRange(val)}`
), '');
