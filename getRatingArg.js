const validateRange = require('./validateRange');

module.exports = (rating) => `rating:${validateRange(rating)}`;
