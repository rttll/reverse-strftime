const directives = require('../lib/config/directives');
const directive = require('../lib/util/directive');

describe('directive()', () => {
  it('should return directive', () => {
    let style = 'long';
    let d = directive('weekday', style);
    expect(d).toBe('%' + directives.weekday[style]);
  });
});
