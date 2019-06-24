const validateRange = require('./validateRange');

module.exports = (totalReviews) => `#reviews:${validateRange(totalReviews)}`;
