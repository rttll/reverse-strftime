module.exports = function (str) {
  return str.includes('m') ? 'lower' : str.includes('M') ? 'caps' : null;
};
