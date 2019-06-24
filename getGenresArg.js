module.exports = (genres) => genres.reduce((str, val) => (
  `${str} genres: ${val}`
));
