module.exports = (systems) => systems.reduce((str, val) => (
  `${str} systems: ${val}`
));
