const chalk = require('chalk');
module.exports = (string) => {
  let msg = `${chalk.green('strftime ➜')} ${string}`;
  msg += ` ${chalk.gray('copied to clipboard.')}`;
  console.log(msg);
};
