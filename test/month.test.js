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
    // TODO: maybe don't do this.
    // Instead use strftime to return results and it iwll be inocrrect there...?
    it.todo('returns undefined');
    // it('returns undefined', () => {
    //   const str = 'Ju 21, 2020';
    //   const month = getMonth(str);
    //   expect(month).toBe(undefined);
    // });
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

  describe('Contains no month name', () => {
    describe('contains integer', () => {
      it('returns 2-digit data', () => {
        const strings = ['Saturday 02/24/1982', '12'];
        for (const str of strings) {
          const month = getMonth(str);
          expect(month.style).toBe('2-digit');
        }
      });
    });

    describe('contains 1 digit integer', () => {
      it.todo('throws error?');
    });
  });
});
