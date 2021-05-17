module.exports = function setSequence(options) {
  let formatter = new Intl.DateTimeFormat(options.locale, {
    dateStyle: options.short ? 'short' : 'full',
    timeStyle: options.short ? 'short' : 'medium',
  });
  let parts = formatter.formatToParts(new Date());
  return parts.map((obj) => ({ ['type']: obj.type }));
};
