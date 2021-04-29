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
program.version(version, '-v, --version').usage('<command>');

program
  .command('generate [date...]', { isDefault: true })
  .description('generate strftime commands')
  .action((options) => {
    if (options.length > 0) {
      generate(options.join(' '))
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
