const program = require('commander');
const hasAnySearchTerms = require('./hasAnySearchTerms');
const {
  description,
  version,
} = require('./package');
const scrape = require('./scrape');

program
  .version(version, '-v, -V, --version')
  .description(`${description}\n\nRanges are expressed as x-y ` +
    'and may be open-ended on either end (e.g. x- or -y).')
  .arguments('<search>')
  .option('-a, --authors <authors>', 'The authors to include.')
  .option('-A, --excludedAuthors <excludedAuthors>', 'The authors to exclude.')
  .option('-d, --deep', 'Scrape additional entry and author data.')
  .option('-g, --genres <genres>', 'The genres to include.')
  .option('-G, --excludedGenres <excludedGenres>', 'The genres to exclude.')
  .option('-o, --outFile <outFile>', 'The file to which the results will be written.')
  .option('-r, --ratings <ratings>', 'The range of the average ratings, e.g. 2.3-4.6')
  .option('-R, --excludedRatings <excludedRatings>', 'The range of ratings to exclude.')
  .option('--ratingDev <ratingDeviance>', 'The standard deviation range of the game\'s reviews.')
  .option('--excludedRatingDev <excludedRatingDeviance>', 'The standard deviation range of the ' +
    'game\'s reviews to exclude.')
  .option('-p, --published <published>', 'The years to include. Ranges are allowed.')
  .option('-Y, --excludedPublished <excludedPublished>', 'The years to exclude. Ranges are allowed.')
  .option('-s, --systems <systems>', 'The systems to include.')
  .option('-S, --excludedSystems <excludedSystems>', 'The systems to exclude.')
  .option('-t, --tags <tags>', 'The tags to include.')
  .option('-T, --excludedTags <excludedTags>', 'The tags to exclude.')
  .option('--totalRatings <totalRatings>', 'The range of total number of ' +
    'ratings to include.')
  .option('--excludedTotalRatings <excludedTotalRatings>', 'The range of ' +
    'total number of ratings.')
  .option('--totalReviews <totalReviews>', 'The range of total number of ' +
    'reviews to include.')
  .option('--excludedTotalReviews <excludedTotalReviews>', 'The range of ' +
    'total number of reviews to exclude.')
  .option('--verbose', 'Turns on verbose logging.')

program.parse(process.argv);

const args = {
  authors: program.authors || null,
  deep: Boolean(program.deep),
  excludedAuthors: program.excludedAuthors,
  excludedGenres: program.excludedGenres || null,
  excludedPublished: program.excludedPublished,
  excludedRatingDeviance: program.excludedRatingDeviance || null,
  excludedRatings: program.excludedRatings || null,
  excludedSystems: program.excludedSystems || null,
  excludedTags: program.excludedTags || null,
  excludedTotalRatings: program.excludedTotalRatings || null,
  excludedTotalReviews: program.excludedTotalReviews || null,
  genres: program.genres || null,
  outFile: program.outFile || null,
  published: program.published || null,
  ratings: program.ratings || null,
  ratingDeviance: program.ratingDeviance || null,
  search: program.args[0] || null,
  systems: program.systems || null,
  tags: program.tags || null,
  totalRatings: program.totalRatings || null,
  verbose: Boolean(program.verbose),
};

if (hasAnySearchTerms(program)) {
  scrape(args).then(
    (data) => {
      if (!program.outFile) {
        console.log(JSON.stringify(data));
      }
    },

    (err) => {
      console.error(err);
      process.exit(err.code || 1);
    },
  );
} else {
  program.outputHelp();
}
