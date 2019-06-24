module.exports = (program) => (
  program &&
    (program.args && program.args.length) ||
    program.author ||
    program.genre ||
    program.rating ||
    program.ratingDeviance ||
    program.system ||
    program.tag ||
    program.totalRatings ||
    program.published
);
