#!/usr/bin/env node

const clipboardy = require('clipboardy');
const { program } = require('commander');
const generate = require('../lib/commands/generate');
const printReference = require('../lib/commands/reference');
const success = require('../lib/loggers/success');
const test = require('../lib/loggers/strftime-test');
const locale = require('../lib/util/locale');

const defaultLocale = locale() || 'en-US';

const afterGenerate = (string) => {
  clipboardy.writeSync(string);
  success(string);
  test(string);
};

const version = require('../package.json').version;
program.version(version, '-v, --version').usage('<command> [options]');

program
  .command('generate [date...]', { isDefault: true })
  .description('generate strftime commands')
  .option(
    '-l, --locale <locale>',
    'Specify the locale to use when parsing input. Uses your locale by default',
    defaultLocale
  )
  .option(
    '-a, --auto',
    'Auto generate strftime string. Uses default date format for the locale.'
  )
  .option('-s, --short', 'When autogenerating, use short formats.')
  .action((date, options) => {
    if (date.length > 0 || options.auto) {
      generate(date, options)
        .then((resp) => {
          if (resp !== undefined && resp.string) {
            afterGenerate(resp.string);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

program
  .command('reference')
  .alias('ref')
  .description('print strftime reference')
  .action(() => {
    printReference();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
