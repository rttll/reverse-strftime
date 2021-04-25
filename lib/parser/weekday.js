const names = require('../names');

module.exports = function (str) {
  const weekday = names.weekday
    .map((data) => {
      let regx = new RegExp(`${data.name}`);
      let match = str.match(regx);
      if (!match) return null;
      if (match) {
        input = str.slice(match.index, match.index + match[0].length);
        if (input == data.name) {
          return data;
        } else {
          return null;
        }
      }
    })
    .filter((res) => res !== null)[0];
  return weekday;
};
