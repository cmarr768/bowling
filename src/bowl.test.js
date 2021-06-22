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

  it('should interpret a - as a 0', () => {
    const frames = ['1-', '-2', '33'];
    const response = bowl.run(frames);
    expect(response).toBe(9);
  });

  it('should handle a spare that is not in the last frame', () => {
    const frames = ['1-', '-/', '33'];
    const response = bowl.run(frames);
    expect(response).toBe(20);
  });
});
