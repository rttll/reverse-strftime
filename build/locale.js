//https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/availableLocales.json

const locales = require('./locales.json').availableLocales.modern;
const setSequence = require('../lib/util/sequence');
const date = new Date();

for (let index = 0; index < locales.length; index++) {
  const locale = locales[index];
  let s = setSequence({ locale });
  try {
    let formatted = new Intl.DateTimeFormat(locale).format(date);
    console.log(`['${locale}', '${formatted}'],`);
  } catch (error) {
    console.log('could not get it');
  }
}
