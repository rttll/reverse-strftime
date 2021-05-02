const directives = require('../config/directives');
const log = console.log;

let input, string;

const getPunc = (match) => {
  const regx = new RegExp(`(?<=${match.name})..`);
  let m = input.join(' ').match(regx);
  if (!m) return null;
  return m[0].replace(/[0-9A-Za-z]/, '');
};

const parse = () => {
  const match = string.match(/[0-9]{1,2}/);
  if (match === null) return null;

  const day = match[0];
  const style = day.length > 1 ? '2-digit' : 'numeric';
  return {
    name: day,
    style: style,
  };
};

module.exports = function (options, weekday) {
  input = options;
  return new Promise(function (resolve, reject) {
    let match = null;
    const slash = options.filter((option) => option.includes('/'))[0];
    if (slash) {
      string = slash.split('/')[1];
    } else {
      string = weekday ? options[2] : options[1];
    }

    if (string) {
      match = parse();
      if (match) {
        match.directive = `%${directives.day[match.style]}`;
        if (slash) match.punctuation = '/';
        else {
          match.punctuation = getPunc(match);
        }
      }
    }

    resolve(match);
  });
};
