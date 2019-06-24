const validateRange = require('./validateRange');

module.exports = (ratings) => ratings.reduce((str, val) => (
  `${str} ratings:${validateRange(val)}`
), '');
