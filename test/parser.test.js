const parser = require('../lib/parser/index');

describe('parser', () => {
  it('should return strftime directives', () => {
    let userInput = 'June 1, 2020';
    let date = userInput.split(' ');
    let parse = parser({ date });
    expect(parse.directives).toStrictEqual(['%B', '%e', '%Y']);
  });
});
