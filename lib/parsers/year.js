const directives = require('../config/directives');
let string;

const parse = () => {
  const match = string.match(/[0-9]{1,4}/);
  if (match === null) return null;

  const year = match[0];
  const style = year.length > 2 ? 'numeric' : '2-digit';

  return { year, style };
};

module.exports = function (options, weekday) {
  let match = null;
  return new Promise(function (resolve, reject) {
    const slash = options.filter((option) => option.includes('/'))[0];
    if (slash) {
      string = slash.split('/')[2];
    } else {
      string = weekday ? options[3] : options[2];
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
