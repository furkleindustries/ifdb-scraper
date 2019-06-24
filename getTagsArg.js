module.exports = (tags) => tags.reduce((str, val) => (
  `${str} tags: ${val}`
));
