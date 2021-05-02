const names = require('../config/names');
const directives = require('../config/directives');

const log = console.log;

let string, input;

const getPunc = (match) => {
  const regx = new RegExp(`(?<=${match.name})..`);
  let m = input.join(' ').match(regx);
  if (!m) return null;
  return m[0].replace(/[0-9A-Za-z]/, '');
};

const getNameMatch = () => {
  const styles = ['long', 'short']; // long must be first
  for (const style of styles) {
    const options = names.month.filter((m) => m.style === style);
    let matches = options.filter((m) => string.includes(m.name));
    if (matches.length > 0) {
      var match = matches[0];
      break;
    }
  }
  return match;
};

const getNumericMatch = () => {
  const matches = string.match(/[0-9]{1,2}/);
  if (matches === null) return null;

  const name = matches[0];
  const punctuation = string
    .slice(matches.index, matches[0].length + 1)
    .replace(/[0-9]/g, '');

  let warn = name.length < 2 ? 'has no single-digit directive' : null;

  return {
    style: '2-digit',
    name,
    punctuation,
    warn,
  };
};

module.exports = function (options, weekday) {
  input = options;
  let match = null;
  return new Promise(function (resolve, reject) {
    const slashes = options.filter((option) => option.includes('/'));
    if (slashes.length > 0) {
      string = slashes[0].split('/')[0];
      match = getNumericMatch();
      match.punctuation = '/';
    } else {
      string = weekday ? options[1] : options[0];
      if (string) {
        if (string.match(/[0-9]/)) {
          match = getNumericMatch();
        } else {
          match = getNameMatch();
        }
      }
    }
    if (match) {
      match.directive = `%${directives.month[match.style]}`;
      if (!match.punctuation) match.punctuation = getPunc(match);
    }
    resolve(match);
  });
};
