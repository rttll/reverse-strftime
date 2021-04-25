const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const times = require('../lib/times');

const log = console.log;
const date = new Date();

const toString = (part, format) => {
  return date.toLocaleString('default', { [part]: format });
};

// '2-digit'
const months = () => {
  const out = [];
  times(12, (i) => {
    date.setMonth(i);
    for (const style of ['long', 'short']) {
      out.push({
        name: toString('month', style),
        style: style,
      });
    }
  });
  return out;
};

const days = () => {
  const out = [];
  times(7, (i) => {
    date.setDate(i + 1);
    for (const style of ['long', 'short']) {
      out.push({
        name: toString('weekday', style),
        style: style,
      });
    }
    // const strings = ['long', 'short'].map((format) => {
    //   return toString('weekday', format);
    // });
    // out.push(strings);
  });
  return out;
};

log('');
log(chalk.yellow('Generating date property names...'));

let m = months();
let d = days();

const content = `
  const month = ${JSON.stringify(m)};
  const weekday = ${JSON.stringify(d)};
  module.exports = {month, weekday}
`;

const file = path.resolve(__dirname, '../lib/names.js');
fs.writeFile(file, content, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  log(' ');
  log(chalk.green('Generated names. File output to:'));
  log(chalk.cyanBright(file));
  log(' ');

  // log(chalk.blue(content));
});
