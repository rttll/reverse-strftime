const { day, getDay } = require('../lib/parsers/day');

const log = console.log;

describe('day()', () => {
  let options = [
    { type: 'alpha', value: 'Mon' },
    { type: 'literal', value: '. ' },
    { type: 'alpha', value: 'June' },
    { type: 'literal', value: ' ' },
    { type: 'int', value: '1' },
    { type: 'literal', value: ', ' },
    { type: 'int', value: '2020' },
  ];
  it('returns an array of all possible matches', async () => {
    let results = await day(options);
    expect(results.length).toBe(1);
  });
});

describe('getDay()', () => {
  describe('option is not an integer', () => {
    it('returns null', async () => {
      let result = getDay('June');
      expect(result).toBe(null);
    });
  });
  describe('option length is above 2', () => {
    it('returns null', async () => {
      let result = getDay('2020');
      expect(result).toBe(null);
    });
  });
  describe('option is an integer of length 1', () => {
    it('returns style numeric', async () => {
      let result = getDay('6');
      expect(result.style).toBe('numeric');
    });
  });
  describe('option is an integer of length 2', () => {
    it('returns style numeric', async () => {
      let result = getDay('06');
      expect(result.style).toBe('2-digit');
    });
    describe('values is above 31', () => {
      it('returns null', async () => {
        let result = getDay('44');
        expect(result).toBe(null);
      });
    });
  });
});
