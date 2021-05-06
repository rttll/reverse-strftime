const names = require('../config/names');
const directives = require('../config/directives');

const log = console.log;

const getNameMatch = (string) => {
  const styles = ['long', 'short']; // long must be first
  for (const style of styles) {
    const options = names.month.filter((m) => m.style === style);
    let matches = options.filter((m) => string.includes(m.name));
    if (matches.length > 0) {
      var match = matches[0];
      break;
    }
  }
  return match;
};

const getNumericMatch = (string) => {
  const matches = string.match(/[0-9]{1,2}/);
  if (matches === null) return null;

  const name = matches[0];

  let warn = name.length < 2 ? 'has no single-digit directive' : null;

  return {
    style: '2-digit',
    name,
    warn,
  };
};

module.exports = function (options) {
  // log('month', options);
  let nameMatch = null;
  return new Promise(function (resolve, reject) {
    results = options
      .map((obj) => {
        match = /[0-9]/.test(obj.value)
          ? getNumericMatch(obj.value)
          : getNameMatch(obj.value);
        if (match && obj.type === 'alpha') nameMatch = match;
        return match;
      })
      .filter((r) => r);
    if (nameMatch) results = [nameMatch];
    resolve(results);
  });
};
