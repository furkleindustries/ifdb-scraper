module.exports = (authors) => authors.reduce((str, val) => (
  `${str} authors: ${val}`
));
