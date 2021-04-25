#!/usr/bin/env node

const { program } = require('commander');
const parser = require('../lib/parser');
const chalk = require('chalk');

log = console.log;

program
  .description('Get strftime directives from date string.')
  .option('-d, --date <date...>', 'Add date');

program.parse();

const options = program.opts();
// TODO output warning bout this
// const ambiguous = stripped.length > max && stripped[0] !== '0';

const parsed = parser(options);

if (parsed.directives) {
  // log(parsed.directives);
  const assembled = parsed.directives.join(' ');
  log('');
  log(assembled);
  log('');
} else {
  log(chalk.red(parsed.error || 'Unknown error'));
}
