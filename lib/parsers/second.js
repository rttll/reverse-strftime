module.exports = function (str) {
  const match = str.match(/[0-9]{1,2}/);
  if (match) {
    let data = {
      style: '2-digit',
    };
    let second = match[0];
    let nextCharAfter = str.slice(second.length)[0];
    if (nextCharAfter) {
      data.punctuation = nextCharAfter.replace(/([0-9ampmAMPM])/, '');
    }
    return data;
  }
  return null;
};
