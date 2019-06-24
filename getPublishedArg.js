const validateRange = require('./validateRange');

module.exports = (published) => `published:${validateRange(published)}`;
