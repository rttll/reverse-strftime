const log = console.log;

function getMinute(str) {
  const matches = str.match(/[0-9]{1,2}/);
  if (!matches) return null;
  return { name: str, style: '2-digit' };
}
exports.getMinute = getMinute;
exports.minute = function (options, sequence) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getMinute(obj.value);
      })
      .filter((r) => r);
    let hasNumericMonth = false;
    let month = sequence.filter((obj) => obj.type === 'month')[0];
    if (month.value && month.value.style === '2-digit') hasNumericMonth = true;

    let index = 4;
    if (!hasNumericMonth) {
      index = 3;
    }
    // log(results[index]);
    resolve(results[index] ? results[index] : null);
  });
};
