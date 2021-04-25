const names = require('../names');

module.exports = function (str) {
  let weekday = names.weekday
    .flat()
    .map((day) => {
      let regx = new RegExp(`${day}`, 'g');
      return str.search(regx) > -1 ? day : null;
    })
    .filter((res) => res !== null)[0];
  return weekday;
};
