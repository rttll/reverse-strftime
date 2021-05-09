const { year, getYear } = require('../lib/parsers/year');
const log = console.log;

describe('year()', () => {
  it('returns an array of all possible matches', async () => {
    let options = [
      { type: 'alpha', value: 'Mon' },
      { type: 'literal', value: '. ' },
      { type: 'alpha', value: '12' },
      { type: 'literal', value: ' ' },
      { type: 'int', value: '11' },
      { type: 'literal', value: ', ' },
      { type: 'int', value: '2020' },
    ];
    let results = await year(options);
    expect(results.length).toBe(3);
  });
});

describe('getYear()', () => {
  describe('options is 1-digit integer', () => {
    let result = getYear('5');
    expect(result).toBe(null);
  });
  describe('options is 2-digit integer', () => {
    let result = getYear('55');
    expect(result.style).toBe('2-digit');
  });
  describe('options is 4-digit integer', () => {
    let result = getYear('2055');
    expect(result.style).toBe('numeric');
  });
});
