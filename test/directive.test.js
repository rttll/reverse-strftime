const directives = require('../lib/config/directives');
const getDirective = require('../lib/parsers/directive');

describe('directive', () => {
  it('should return directive', () => {
    let style = 'long';
    let directive = getDirective('weekday', style);
    expect(directive).toBe('%' + directives.weekday[style]);
  });
});
