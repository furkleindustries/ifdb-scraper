module.exports = (program) => (
  program &&
    (program.args && program.args.length) ||
    program.author ||
    (program.excluded &&
      Object.getOwnPropertyNames(program.excluded).length) ||
    program.genre ||
    program.rating ||
    program.ratingDeviance ||
    program.system ||
    program.tag ||
    program.totalRatings ||
    program.totalReviews ||
    program.published
);
