const prompts = require('../util/prompts');
const log = console.log;

async function getHour(str) {
  return { style: '12-2-digit' };
  const matches = str.match(/[0-9]{1,2}/);
  if (!matches) return null;

  let data = {};
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
      if (container.meridian) {
        data.style = '12-2-digit';
      } else {
        let pref = await prompts.clock();
        data.style = pref.style;
      }
    }
    // 13, 14 .... 23, ask if want zero or blak padded
    if (int > 12) {
      let pref = await prompts.hour();
      data.style = pref.style;
    }
  }

  return data;
}

exports.getHour;
exports.hour = function (options) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map(async (obj) => {
        return await getHour(obj.value);
      })
      .filter((r) => r);
    resolve(results);
  });
};
