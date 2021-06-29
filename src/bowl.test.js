const bowl = require('./bowl');

describe('bowl', () => {
  it('should be a function', () => {
    expect(typeof bowl.run === 'function').toBeTruthy();
  });

  describe('when all frames have number scores', () => {
    it('should return the total score of the frames passed in', () => {
      const frames = '11 11 11 11 11 11 11 11 11 11';
      const response = bowl.run(frames);
      expect(response).toBe(20);
    });
  });

  it('should interpret a - as a 0', () => {
    const frames = '-1 1- 11 -- 11 11 11 11 11 11';
    const response = bowl.run(frames);
    expect(response).toBe(16);
  });

  it('should handle a spare that is not in the last frame', () => {
    const frames = '-- -/ 33 -- -- -- -- -- -- --';
    const response = bowl.run(frames);
    expect(response).toBe(19);
  });
});
