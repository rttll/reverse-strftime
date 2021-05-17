function getMinute() {
  let data = { style: '2-digit' };
  return data;
}
exports.getMinute;
exports.minute = function (options, sequence) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getMinute();
      })
      .filter((r) => r);
    resolve(results);
  });
};
