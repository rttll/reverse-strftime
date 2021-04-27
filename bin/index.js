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
      const out = generate(options.join(' '));
      if (out !== undefined && out.string) {
        afterGenerate(out.string);
      }
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
