const chalk = require('chalk');
const directives = require('../config/directives');
const prompts = require('../util/prompts');
const getMeridian = require('./meridian');

const log = console.log;

let container;

function getPart(str, partname) {
  let data = { style: '2-digit' };

  data.directive = '%' + directives[partname][data.style];
  return data;
}

async function getHour(str) {
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

  data.directive = '%' + directives.hour[data.style];
  return data;
}

async function getUnformattedTime(options) {
  let search = options.join(' ').match(/\s.{1,3}(pm|am|AM|PM)/);
  let time = search[0];
  if (!time) return;

  let hourString = time.replace(/am|pm|AM|PM/, '');
  container.hour = await getHour(hourString.trim());
}

async function getFormattedTime(formattedTime, options) {
  let [hourString, minuteString, secondString] = formattedTime.split(':');

  container.hour = await getHour(hourString.trim());
  container.hour.punctuation = ':';

  if (!minuteString) return;
  container.minute = await getPart(minuteString.trim(), 'minute');
  if (secondString) {
    container.minute.punctuation = ':';
  }

  if (!secondString) return;
  container.second = await getPart(secondString.trim(), 'second');
}

module.exports = (options, components) => {
  container = components;
  return new Promise(async function (resolve, reject) {
    container.meridian = getMeridian(options);

    let hasFormattedTime = options.filter((part) => part.includes(':'));
    let formattedTime = hasFormattedTime[0];

    if (container.meridian && !formattedTime) {
      await getUnformattedTime(options);
    } else {
      try {
        await getFormattedTime(formattedTime, options);
      } catch (error) {}
    }

    if (container.meridian) {
      let spaceBefore = options.join(' ').match(/\s(am|pm|AM|PM)/);
      if (spaceBefore) container.meridian.before = ' ';
    }

    resolve();
  });
};
