const validateRange = require('./validateRange');

module.exports = (totalRatings) => `#ratings:${validateRange(totalRatings)}`;
