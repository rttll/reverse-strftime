const log = console.log;
const prompts = require('prompts');

const getPref = async (questions) => {
  return await prompts({ type: 'select', name: 'style', ...questions });
};

const getHour = async (str) => {
  const match = str.match(/[0-9]{1,2}/);
  let data = {};
  if (match) {
    let hour = match[0];

    if (hour === '00') {
      data.style = '24-2-digit';
    }

    // 1, 2, 3...12 it's 12 hour
    if (hour.length === 1 && parseInt(hour) > 0 && parseInt(hour) < 10) {
      data.style = '12-numeric';
    }

    // 13, 14 .... 23, ask if want zero or blak padded
    if (parseInt(hour) > 12) {
      let question = {
        message: 'Do you want the hour in 2-digit or 1-digit style?',
        choices: [
          { title: '2-digit', value: '24-2-digit', description: 'e.g 04' },
          {
            title: '1-digit',
            value: '24-numeric',
            description: 'e.g 4',
          },
        ],
      };
      let pref = await getPref(question);
      data.style = pref.style;
    }

    // 01, 02, 03...12 => ask if want 12 or 24 time
    if (parseInt(hour) < 13) {
      let question = {
        message: 'Do you want 12 or 24 hour time?',
        choices: [
          { title: '12-hour', value: '12-2-digit', description: '04' },
          { title: '24-hour', value: '24-2-digit', description: '4' },
        ],
      };
      let pref = await getPref(question);
      data.style = pref.style;
    }

    let nextCharAfter = str.slice(hour.length)[0];
    if (nextCharAfter) {
      data.punctuation = nextCharAfter.replace(/([0-9ampmAMPM])/, '');
    }
    return data;
  }
  return null;
};

module.exports = async function (str) {
  let match = await getHour(str);
  return match;
};
