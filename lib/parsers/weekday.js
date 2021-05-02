('use strict');

const directives = require('../config/directives');
const names = require('../config/names');
const log = console.log;

let input;

const getPunc = (match) => {
  // return string.replace(match.name, '');

  const regx = new RegExp(`(?<=${match.name})..`);
  let m = input.join(' ').match(regx);
  if (!m) return '';

  return m[0].replace(/[0-9A-Za-z]/, '');
};

/**
 *
 * @param {String} option
 * @returns {Object} match
 *
 */

const getMatch = (option) => {
  const styles = ['long', 'short'];
  for (const style of styles) {
    const options = names.weekday.filter((m) => m.style === style);
    let matches = options.filter((m) => option.includes(m.name));
    if (matches.length > 0) {
      return matches[0];
    }
  }
  return null;
};

module.exports = function (options) {
  input = options;
  return new Promise(function (resolve, reject) {
    let match = getMatch(options[0]);
    if (match) {
      match.directive = '%' + directives.weekday[match.style];
      match.punctuation = getPunc(match);
    }
    resolve(match);
  });
};
