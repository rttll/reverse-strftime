module.exports = function (str) {
  const match = str.match(/[0-9]{1,4}/);
  if (match === null) return null;

  const year = match[0];
  const style = year.length > 2 ? 'numeric' : '2-digit';

  return { year, style };
};
