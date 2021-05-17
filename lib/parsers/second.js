function getSecond() {
  let data = { style: '2-digit' };
  return data;
}
exports.getSecond;
exports.second = function (options) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getSecond();
      })
      .filter((r) => r);
    resolve(results);
  });
};
