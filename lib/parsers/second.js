const log = console.log;

function getSecond(str) {
  const matches = str.match(/[0-9]{1,2}/);
  if (!matches) return null;
  return { name: str, style: '2-digit' };
}
exports.getSecond;
exports.second = function (options, sequence) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getSecond(obj.value);
      })
      .filter((r) => r);
    let hasNumericMonth = false;
    let month = sequence.filter((obj) => obj.type === 'month')[0];
    if (month.value && month.value.style === '2-digit') hasNumericMonth = true;

    let index = 5;
    if (!hasNumericMonth) {
      index = 4;
    }
    resolve(results[index] ? results[index] : null);
  });
};
