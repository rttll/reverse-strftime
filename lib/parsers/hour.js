const log = console.log;

function getHour(str, meridian) {
  const matches = str.match(/[0-9]{1,2}/);
  if (!matches) return null;

  let data = {
    name: str,
  };
  let int = parseInt(str);
  // 1, 2, 3...9
  if (str.length === 1) {
    if (int > 0 && int < 10) {
      data.style = '12-numeric';
    }
  } else {
    if (str === '00') {
      data.style = '24-2-digit';
    }
    // 01, 02, 03...12 => ask if want 12 or 24 time
    if (str.length > 1 && int < 13) {
      // If am/pm is included, use 12 hour time
      if (meridian) {
        data.style = '12-2-digit';
      } else {
        // TODO warn
        data.style = '24-2-digit';
      }
    }
    // 13, 14 .... 23, ask if want zero or blak padded
    if (int > 12) {
      // TODO warn
      data.style = '24-2-digit';
    }
  }

  return data;
}

exports.getHour;
exports.hour = function (options, sequence) {
  let meridian = /(pm|am|AM|PM)/.test(options[options.length - 1].value);
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getHour(obj.value, meridian);
      })
      .filter((r) => r);

    let hasNumericMonth = false;
    let month = sequence.filter((obj) => obj.type === 'month')[0];
    if (month.value && month.value.style === '2-digit') hasNumericMonth = true;

    let index = 3;
    if (!hasNumericMonth) {
      index = 2;
    }
    resolve(results[index] ? results[index] : null);
  });
};
