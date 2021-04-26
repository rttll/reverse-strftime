const names = require('../names');
const stringUtil = require('../util/string');
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
      const regx = new RegExp(`(?<=${match.name}).`);
      const charAfter = str.match(regx);
      if (charAfter) {
        match.punctuation = charAfter[0].trim();
      }
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
    punctuation: punctuation,
  };
};

module.exports = function (str) {
  let match = getNameMatch(str);
  if (!match) {
    match = getNumericMatch(str);
  }
  return match;
};
