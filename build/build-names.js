const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const times = require('../lib/util/times');

const log = console.log;
const date = new Date();

/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

*/

const toString = (part, format) => {
  return date.toLocaleString('default', { [part]: format });
};

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

const file = path.resolve(__dirname, '../lib/config/names.js');
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
