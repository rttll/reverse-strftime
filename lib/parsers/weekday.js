('use strict');

const names = require('../config/names');
const log = console.log;

const getPunc = (match, str) => {
  const regx = new RegExp(`(?<=${match.name})..`);
  let m = str.match(regx);
  if (!m) return null;

  return m[0].replace(/[0-9A-Za-z]/, '');
};

module.exports = function (str) {
  const styles = ['long', 'short'];
  for (const style of styles) {
    const options = names.weekday.filter((m) => m.style === style);
    let matches = options.filter((m) => str.includes(m.name));
    if (matches.length > 0) {
      var match = matches[0];
      match.punctuation = getPunc(match, str);
      break;
    }
  }
  return match;
};
