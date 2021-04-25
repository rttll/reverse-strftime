/**
 *
 * @param {integer} option
 * @param {integer} max
 * @returns String
 */

module.exports = function (option, max) {
  const stripped = option
    .split('')
    .filter((prop) => {
      return !isNaN(parseInt(prop));
    })
    .join('');

  const style = stripped.length > max ? '2-digit' : 'numeric';
  return { style };
};
