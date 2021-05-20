const chalk = require('chalk');
const strftime = require('strftime');
const directives = require('../config/directives');

const log = console.log;

let defaultDate = new Date(1999, 7, 1, 1),
  date = defaultDate,
  desc = null;

function setDateAndDesc(command) {
  if (command === 'k') {
    log(chalk.gray('➜ Hour (24-hour)'));
    date = new Date(1999, 7, 1, 16);
    desc = '- Space-padded. 0-23';
  }
  if (command === 'H') {
    date = new Date(1999, 7, 1, 1, 45);
    desc = '- Zero-padded. 00-23';
  }
  if (command === 'l') {
    log();
    log(chalk.gray('➜ Hour (12-hour)'));
    desc = '- Space-padded. 1-12';
  }
  if (command === 'I') {
    desc = '- Zero-padded. 01-12';
  }
}

function print(command, style) {
  setDateAndDesc(command);
  let eg = strftime(`%${command}`, date);
  let line = `%${command} ` + chalk.gray(eg);
  if (desc) {
    line += chalk.gray(` ${desc}`);
  }
  log(line);
}

module.exports = function () {
  for (let k in directives) {
    if (k !== 'hour') {
      log(chalk.dim('➜ ' + k[0].toUpperCase() + k.slice(1)));
    }
    let r = directives[k];
    for (let style in r) {
      print(r[style], style);
      date = defaultDate;
      desc = null;
    }
    log('');
  }
};
