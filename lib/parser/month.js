const names = require('../names');
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
        match.punctuation = charAfter[0];
      }
      break;
    }
  }
  return match;
};

const getNumericMatch = (str) => {
  const matches = str.match(/[0-9]{1,2}/);
  if (matches === null) return null;

  const name = matches[0];
  const punctuation = str
    .slice(matches.index, matches[0].length + 1)
    .replace(/[0-9]/g, '');

  let warn = name.length < 2 ? 'has no single-digit directive' : null;

  return {
    style: '2-digit',
    name,
    punctuation,
    warn,
  };
};

module.exports = function (str) {
  let match = getNameMatch(str);
  if (!match) {
    match = getNumericMatch(str);
  }
  return match;
};
