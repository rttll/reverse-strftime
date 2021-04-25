const getWeekday = require('../lib/parser/weekday');

describe('getWeekday', () => {
  it('Returns day of week from date string', () => {
    const weekday = getWeekday('Saturday Jun 1');
    expect(weekday).toBe('Saturday');
  });
  it('Returns short day of week ', () => {
    const shortDay = getWeekday('Sat Jun 1');
    expect(shortDay).toBe('Sat');
  });
});
