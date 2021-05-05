const directives = require('../config/directives');
let string;

const parse = () => {
  const match = string.match(/[0-9]{1,4}/);
  if (match === null) return null;

  const year = match[0];
  const style = year.length > 2 ? 'numeric' : '2-digit';

  return { year, style };
};

module.exports = function (options, weekday, location) {
  let match = null;
  const delimiters = ['/', '-'];
  return new Promise(function (resolve, reject) {
    let delimiter = delimiters.filter((d) => options.join(' ').includes(d))[0];
    if (delimiter) {
      string = options
        .filter((option) => option.includes(delimiter))[0]
        .split(delimiter)[2];
    } else {
      let index = location ? location : weekday ? 3 : 2;
      string = options[index];
    }

    if (string) {
      match = parse();
      if (match) {
        match.directive = `%${directives.year[match.style]}`;
        match.punctuation = ' ';
      }
    }

    resolve(match);
  });
};
