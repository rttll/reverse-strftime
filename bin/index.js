#!/usr/bin/env node

const { program } = require('commander');
const parser = require('../lib/parser');
const chalk = require('chalk');

log = console.log;

program
  .description('An application for pizza ordering')
  // .option('-d, --date', 'Add date')
  .option('-d, --date <date...>', 'Add date');

program.parse();

const options = program.opts();
// TODO output warning bout this
// const ambiguous = stripped.length > max && stripped[0] !== '0';

let parsed = parser(options);
if (parsed.error) {
  log(chalk.red(parsed.error));
}
