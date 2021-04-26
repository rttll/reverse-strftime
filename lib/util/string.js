const stripAlpha = (string) => {
  return string.replace(/[a-zA-z]/g, '');
};
const stripInt = (string) => {
  return string.replace(/[0-9]/g, '');
};
const onlyInt = (string) => {
  return string.replace(/[^0-9]/g, '');
};

module.exports = { stripAlpha, stripInt, onlyInt };
