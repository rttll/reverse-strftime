const names = require('../names');

module.exports = function (str) {
  const monthName = names.month
    .flat()
    .map((month) => {
      let regx = new RegExp(`${month.name}`);
      let match = str.match(regx);
      if (!match) return null;
      if (match) {
        input = str.slice(match.index, match.index + match[0].length);
        if (input == month.name) {
          return month;
        } else {
          return null;
        }
      }
    })
    .filter((res) => res !== null)[0];
  return monthName;
};
