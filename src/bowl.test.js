const bowl = require('./bowl');

describe('bowl', () => {
  it('should be a function', () => {
    expect(typeof bowl.run === 'function').toBeTruthy();
  });

  describe('when all frames have number scores', () => {
    it('should return the total scrore of the frames passed in', () => {
      const frames = ['11', '22', '33'];
      const response = bowl.run(frames);
      expect(response).toBe(12);
    });
  });
});
