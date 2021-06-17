const bowl = require('./bowl');

describe('bowl', () => {
  it('should be a function', () => {
    expect(typeof bowl.run === 'function').toBeTruthy();
  });
});
