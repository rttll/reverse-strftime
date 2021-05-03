const getYear = require('../lib/parsers/year');

const log = console.log;

describe('getYear(options)', () => {
  describe('Is double digit integer', () => {
    const data = [
      ['Jan 1 20', 'Jan 1 20', '2-digit', '%y'],
      ['1/1/19', '1/1/19', '2-digit', '%y'],
      ['1-1-19', '1-1-19', '2-digit', '%y'],
    ];
    test.each(data)('year(%s)', (memo, options, style, directive) => {
      getYear(options.split(' '))
        .then((year) => {
          expect(year.style).toBe(style);
          expect(year.directive).toBe(directive);
        })
        .catch(console.error);
    });
  });

  describe('Is 4-digit integer', () => {
    const data = [
      ['Jan 23, 4040', 'Jan 23, 4040', '%Y'],
      ['1/1/4040', '1/1/4040', '%Y'],
      ['1-1-4040', '1-1-4040', '%Y'],
    ];
    test.each(data)('year(%s)', (memo, options, directive) => {
      getYear(options.split(' '))
        .then((year) => {
          expect(year.directive).toBe(directive);
        })
        .catch(console.error);
    });
  });

  describe('No year', () => {
    it('returns null', () => {
      const options = 'Mon. June 1';
      getYear(options.split(' '), true)
        .then((year) => {
          expect(year).toBe(null);
        })
        .catch(console.error);
    });
  });

  // describe('has surrounding punctuation', () => {
  //   const data = [
  //     ['.99.', '99', '2-digit'],
  //     ['/9999', '9999', 'numeric'],
  //     ['..1000///!', '1000', 'numeric'],
  //   ];
  //   test.each(data)('day(%s)', (str, out, style) => {
  //     const result = getYear(str);
  //     expect(result.getYear).toBe(out);
  //     expect(result.style).toBe(style);
  //   });
  // });

  // describe('is empty string', () => {
  //   it('should return null', () => {
  //     const result = getYear('');
  //     expect(result).toBe(null);
  //   });
  // });

  // describe('is time format', () => {
  //   // 12pm, 1:20AM
  //   it.todo('should return null');
  // });
});
