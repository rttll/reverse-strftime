const strftime = require('strftime');
const chalk = require('chalk');
module.exports = (string) => {
  try {
    const test = strftime(string);
    console.log(chalk.yellow('test     ➜ ') + test.replace(/\s\s/, ' '));
  } catch (error) {
    console.error('Could not test ', error);
  }
};
