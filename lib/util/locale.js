module.exports = function () {
  let env = process.env;
  let locale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
  if (!locale) return false;
  return locale.split('.')[0].replace('_', '-');
};
