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
  const delimiters = ['/', '-'];
  return new Promise(function (resolve, reject) {
    let match = null;
    let delimiter = delimiters.filter((d) => options.join(' ').includes(d))[0];
    const slash = options.filter((option) => option.includes('/'))[0];
    if (delimiter) {
      string = options
        .filter((option) => option.includes(delimiter))[0]
        .split(delimiter)[1];
    } else {
      string = weekday ? options[2] : options[1];
    }

    if (string) {
      match = parse();
      if (match) {
        match.directive = `%${directives.day[match.style]}`;
        if (slash) match.punctuation = delimiter;
        else {
          match.punctuation = getPunc(match);
        }
      }
    }

    resolve(match);
  });
};
