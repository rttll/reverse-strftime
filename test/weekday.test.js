const getWeekday = require('../lib/parser/weekday');

describe('getWeekday', () => {
  describe('Full weekday passed in', () => {
    it('should return "long" as style', () => {
      const weekday = getWeekday('Saturday Jun 1');
      expect(weekday.style).toBe('long');
    });
    it('should return matching long name', () => {
      const weekday = getWeekday('Saturday Jun 1');
      expect(weekday.name).toBe('Saturday');
    });
  });
  describe('Abbreviated weekday passed in', () => {
    it('should return "short" as style', () => {
      const weekday = getWeekday('Sat 4/4');
      expect(weekday.style).toBe('short');
      expect(weekday.name).toBe('Sat');
    });
    it('should return matching short name', () => {
      const weekday = getWeekday('Sat June 1, 2020');
      expect(weekday.name).toBe('Sat');
    });
  });
});
