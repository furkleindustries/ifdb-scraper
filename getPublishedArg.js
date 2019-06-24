const validateRange = require('./validateRange');

module.exports = (published) => published.reduce((str, val) => (
  `${str} published:${validateRange(val)}`
), '');
