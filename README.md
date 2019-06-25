# ifdb-scraper

A simple module and CLI tool for scraping entry metadata from the Interactive Fiction Database.

## Usage

```
node ./cli.js [options] <search>

Ranges are expressed as x-y and may be open-ended on either end (e.g. x- or -y).

Options:
  -v, -V, --version                              output the version number
  -a, --authors <authors>                        The authors to include.
  -A, --excludedAuthors <excludedAuthors>        The authors to exclude.
  -d, --deep                                     Scrape additional entry and author data.
  -g, --genres <genres>                          The genres to include.
  -G, --excludedGenres <excludedGenres>          The genres to exclude.
  -o, --outFile <outFile>                        The file to which the results will be written.
  -r, --ratings <ratings>                        The range of the average ratings, e.g. 2.3-4.6
  -R, --excludedRatings <excludedRatings>        The range of ratings to exclude.
  --ratingDev <ratingDeviance>                   The standard deviation range of the game's reviews.
  --excludedRatingDev <excludedRatingDeviance>   The standard deviation range of the game's reviews to exclude.
  -p, --published <published>                    The years to include. Ranges are allowed.
  -Y, --excludedPublished <excludedPublished>    The years to exclude. Ranges are allowed.
  -s, --systems <systems>                        The systems to include.
  -S, --excludedSystems <excludedSystems>        The systems to exclude.
  -t, --tags <tags>                              The tags to include.
  -T, --excludedTags <excludedTags>              The tags to exclude.
  --totalRatings <totalRatings>                  The range of total number of ratings to include.
  --excludedTotalRatings <excludedTotalRatings>  The range of total number of ratings.
  --totalReviews <totalReviews>                  The range of total number of reviews to include.
  --excludedTotalReviews <excludedTotalReviews>  The range of total number of reviews to exclude.
  --verbose                                      Turns on verbose logging.
  -h, --help                                     output usage information
```

Values in brackets are the name of the argument in JavaScript. Otherwise, the --value is the name of the argument. E.g. if you wanted to use the module, you would call it like so:

```
const scrape = require('ifdb-scraper');
scrape({ search: 'SPY INTRIGUE' });
```

You may include as many of the arguments above, save for the help and version options, in the arguments object.

## Installation

To install through git, download [git](https://git-scm.com).

In a command-line shell of your choice (Git Bash if you just installed git), execute the following:

```
git clone https://github.com/furkleindustries/ifdb-scraper
```

You may also install through npm with:

```
npm install -S ifdb-scraper
```

Then, you may either execute the cli program at `cli.js` or in an npm script with `ifdb-scraper`, or require the module, which exposes the `scrape` function.
