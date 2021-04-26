const stringUtil = require('../util/string');
const names = require('../names');
const getWeekday = require('./weekday');
const log = console.log;

const getNameMatch = (str) => {
  // `long` must be checked first, because short names can return false positive
  // (since `January` includes `Jan`)
  const styles = ['long', 'short'];
  for (const style of styles) {
    const options = names.month.filter((m) => m.style === style);
    let matches = options.filter((m) => str.includes(m.name));
    if (matches.length > 0) {
      var match = matches[0];
      // Punctuation
      const arr = str.split(' ');
      const punctuation = arr[arr.indexOf(match.name) + 1].trim();
      if (punctuation.length > 0) match.punctuation = punctuation;
      break;
    }
  }
  return match;
};

const getNumericMatch = (str) => {
  const noAlpha = stringUtil.stripAlpha(str).trim().slice(0, 2);
  const month = stringUtil.onlyInt(noAlpha);
  const punctuation = stringUtil.stripInt(noAlpha);
  return {
    name: month,
    style: '2-digit',
    punctuation: punctuation.length > 0 ? punctuation : null,
  };
};

module.exports = function (str) {
  let match = getNameMatch(str);
  if (!match) {
    match = getNumericMatch(str);
  }
  return match;
};
