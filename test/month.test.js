const getMonth = require('../lib/parser/month');

describe('Month', () => {
  it('returns month data from names', () => {
    const str = 'June 23';
    const month = getMonth(str);
    expect(typeof month).toBe('object');
  });

  it('should ignore leading day names', () => {
    const str = 'Tue June 23';
    const month = getMonth(str);
    expect(typeof month).toBe('object');
  });

  describe('does not contain valid month name', () => {
    it('returns undefined', () => {
      const str = 'Ju 21, 2020';
      const month = getMonth(str);
      expect(month).toBe(undefined);
    });
  });

  describe('contains short month', () => {
    it('returns short month data', () => {
      const str = 'Jun 21, 2020';
      const month = getMonth(str);
      expect(month.style).toBe('short');
    });
  });

  describe('contains long month', () => {
    it('returns long month data', () => {
      const str = 'December 31 4040';
      const month = getMonth(str);
      expect(month.style).toBe('long');
    });
  });
});
