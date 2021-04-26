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

let assembled;

const logTest = () => {
  const test = strftime(assembled);
  log(chalk.yellow('test     ➜ ') + test);
};

const logOut = (copied) => {
  let msg = `${chalk.green('strftime ➜')} ${assembled}`;
  if (copied) msg += ` ${chalk.gray('copied to clipboard.')}`;
  log(msg);
};

if (parsed.directives) {
  assembled = parsed.directives.join(' ');
  clipboardy
    .write(assembled)
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
