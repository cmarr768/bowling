const bowl = require('./bowl');

describe('bowl', () => {
  it('should be a function', () => {
    expect(typeof bowl.run === 'function').toBeTruthy();
  });

  describe('when all frames have number scores', () => {
    it('should return the total score of the frames passed in', async () => {
      const frames = '11 11 11 11 11 11 11 11 11 11';
      const response = await bowl.run(frames);
      expect(response).toBe(20);
    });
  });

  it('should interpret a - as a 0', async () => {
    const frames = '-1 1- 11 -- 11 11 11 11 11 11';
    const response = await bowl.run(frames);
    expect(response).toBe(16);
  });

  it('should handle a spare that is not in the last frame', async () => {
    const frames = '-- -/ 33 -- -- -- -- -- -- --';
    const response = await bowl.run(frames);
    expect(response).toBe(19);
  });

  describe('when a strike is bowled', () => {
    it('should handle a strike followed by two numbers in the following frame', async () => {
      const frames = '-- x 33 -- -- -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(22);
    });

    it('should handle a strike followed by two a gutter ball in one of the next two throws', async () => {
      const frames = '-- x -3 -- -- -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(16);
    });

    it('should handle a strike followed by two a gutter ball in one of the next two throws', async () => {
      const frames = '-- x 6/ -- -- -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(30);
    });

    it('should handle a strike followed by two a gutter ball in one of the next two throws', async () => {
      const frames = '-- x 2- -- -- -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(14);
    });

    it('should handle a strike followed by a single strike', async () => {
      const frames = '-- x x 2- -- -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(36);
    });

    it('should handle a strike followed by a single strike', async () => {
      const frames = '-- x x -- -- -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(30);
    });

    it('should handle a turkey', async () => {
      const frames = '-- x x x 72 -- -- -- -- --';
      const response = await bowl.run(frames);
      expect(response).toBe(85);
    });
  });
});
