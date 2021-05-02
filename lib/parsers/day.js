const directives = require('../config/directives');
const log = console.log;
let string;
const parse = () => {
  const match = string.match(/[0-9]{1,2}/);
  if (match === null) return null;

  const day = match[0];
  const punctuation = string.replace(/[0-9]/g, '');
  const style = day.length > 1 ? '2-digit' : 'numeric';
  return {
    name: day,
    style: style,
    punctuation: punctuation,
  };
};

module.exports = function (options, weekday) {
  return new Promise(function (resolve, reject) {
    const slash = options.filter((option) => option.includes('/'))[0];
    if (slash) {
      string = slash.split('/')[1];
    } else {
      string = weekday ? options[2] : options[1];
    }
    var match = parse();
    if (match) {
      match.directive = `%${directives.day[match.style]}`;
      if (slash) match.punctuation = '/';
    }
    resolve(match);
  });
};
