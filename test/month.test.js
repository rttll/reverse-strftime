const getMonth = require('../lib/parsers/month');

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

  it.todo('strips match from string and returns new string');

  describe('does not contain valid month name', () => {
    // TODO: maybe don't do this.
    // Instead use strftime to return results and it iwll be inocrrect there...?
    it.todo('returns undefined');
  });

  describe('contains short month', () => {
    it('returns short month data', () => {
      const str = 'Jun 21, 2020';
      const month = getMonth(str);
      expect(month.style).toBe('short');
    });

    describe('with punctuation', () => {
      it('returns punctuation and spacing', () => {
        const str = 'Jun. 21, 2020';
        const month = getMonth(str);
        expect(month.punctuation).toBe('. ');
      });

      test.each([
        ['ignores alphanumeric', 'Jun.21, 2020', '.'],
        ['ignores extra spacing', 'Jun.  21, 2020', '. '],
        ['allows grammar mistakes', 'September. 21, 2020', '. '],
      ])('%s', (memo, input, expected) => {
        let month = getMonth(input);
        expect(month.punctuation).toBe(expected);
      });
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
