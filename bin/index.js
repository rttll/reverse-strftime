#!/usr/bin/env node

const { program } = require('commander');
const parser = require('../lib/parser');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const strftime = require('strftime');

log = console.log;

program
  .description('Get strftime directives from date string.')
  .option('-d, --date <date...>', 'Add date');

program.parse();

const options = program.opts();
// TODO output warning bout this
// const ambiguous = stripped.length > max && stripped[0] !== '0';

const parsed = parser(options);

let string;

const logTest = () => {
  try {
    const test = strftime(string);
    log(chalk.yellow('test     ➜ ') + test);
  } catch (error) {
    console.error('Could not test ', error);
  }
};

const logOut = (copied) => {
  let msg = `${chalk.green('strftime ➜')} ${string}`;
  if (copied) msg += ` ${chalk.gray('copied to clipboard.')}`;
  log(msg);
};

if (parsed.string) {
  string = parsed.string;
  clipboardy
    .write(string)
    .then(() => {
      logOut(true);
    })
    .catch(() => {
      logOut(false);
    })
    .finally(() => {
      logTest();
    });
} else {
  log(chalk.red(parsed.error || 'Unknown error'));
}
