('use strict');

const directives = require('../config/directives');
const names = require('../config/names');
const log = console.log;

let string;
const getPunc = (match) => {
  return string.replace(match.name, '');
  const regx = new RegExp(`(?<=${match.name})..`);
  let m = string.match(regx);
  if (!m) return '';

  return m[0].replace(/[0-9A-Za-z]/, '');
};

const parse = () => {
  const styles = ['long', 'short'];
  for (const style of styles) {
    const options = names.weekday.filter((m) => m.style === style);
    let matches = options.filter((m) => string.includes(m.name));
    if (matches.length > 0) {
      var match = matches[0];
      match.punctuation = getPunc(match, string);
      break;
    }
  }
  return match;
};

module.exports = function (options) {
  string = options[0];
  return new Promise(function (resolve, reject) {
    let match = parse();
    if (match) match.directive = '%' + directives.weekday[match.style];
    resolve(match);
  });
};
