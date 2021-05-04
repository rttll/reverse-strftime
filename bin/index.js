#!/usr/bin/env node

const clipboardy = require('clipboardy');
const { program } = require('commander');
const generate = require('../lib/commands/generate');
const success = require('../lib/loggers/success');
const test = require('../lib/loggers/strftime-test');

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
  .option('-a, --auto', 'generate a default')
  .option('-l, --locale [locale]', 'specify the locale')
  .option('-s, --short', 'use short formats')
  .option('--no-time', "don't include time when autogenerating")
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

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
