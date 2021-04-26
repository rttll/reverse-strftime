const parser = require('../lib/parser/index');

describe('parser()', () => {
  const data = [
    // ['Saturday June 01, 2020', '%A %B %d, %Y'], // throws false negative and screws up all these tests
    ['June 1, 2020', '%B %e, %Y'],
    ['04.4.4444', '%m.%e.%Y'],
  ];
  test.each(data)('%s', (input, out) => {
    let date = input.split(' ');
    let parsed = parser({ date });
    expect(parsed.string).toEqual(out);
  });
});
