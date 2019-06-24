module.exports = (program) => (
  program &&
    (program.args && program.args.length) ||
    program.authors ||
    program.genres ||
    program.ratings ||
    program.ratingDeviance ||
    program.systems ||
    program.tags ||
    program.totalRatings ||
    program.published
);
