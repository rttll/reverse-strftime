module.exports = function (str) {
  const match = str.match(/[0-9]{1,2}/);
  if (match === null) return null;

  const day = match[0];
  const punctuation = str.replace(/[0-9]/g, '').trim();
  const style = day.length > 1 ? '2-digit' : 'numeric';

  return {
    name: day,
    style: style,
    punctuation: punctuation,
  };
};
