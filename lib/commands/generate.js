const custom = require('./_custom');
const preset = require('./_preset');

const log = console.log;

/**
 *
 * @param {Array} date
 * @param {Object} options
 * @returns
 */

module.exports = async (date, options) => {
  // log(process.versions.node)
  if (options.auto) {
    var sequence = await preset(options);
  } else {
    var sequence = await custom(date, options);
  }

  if (!sequence) return false;

  let string = sequence
    .filter((obj) => obj.value)
    .map((obj) => (obj.type === 'literal' ? obj.value : obj.directive))
    .join('');
  return { string };
};
