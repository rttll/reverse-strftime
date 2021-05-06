('use strict');

const directives = require('../config/directives');
const names = require('../config/names');
const log = console.log;

let input;

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
  // log('weekday.js', options);
  let type = 'alpha';
  return new Promise(function (resolve, reject) {
    results = options.map((obj) => {
      if (obj.type !== type) return null;
      return getMatch(obj.value);
    });
    resolve(results.filter((r) => r));
    // resolve(results);
  });
};
