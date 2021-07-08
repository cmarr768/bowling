const frame = require('./frame');

describe('get', () => {
  it('should be a function', () => {
    expect(typeof frame.get === 'function').toBeTruthy();
  });

  it('should return the expect frame object', async () => {
    const frameInput = { frame: '11', index: 0 };
    const response = await frame.get(frameInput);
    expect(response).toStrictEqual({
      frame: 1,
      firstRoll: '1',
      secondRoll: '1',
      thirdRoll: undefined,
      hasStrike: false,
      hasSpare: false,
      firstPinfall: 1,
      secondPinfall: 1,
      thirdPinfall: 0,
      total: 2,
    });
  });

  it('should handle gutter balls', async () => {
    const frameInput = { frame: '-1', index: 0 };
    const response = await frame.get(frameInput);
    expect(response).toMatchObject({
      firstPinfall: 0,
      total: 1,
    });
  });

  it('should handle spares', async () => {
    const frameInput = { frame: '3/', index: 0 };
    const response = await frame.get(frameInput);
    expect(response).toMatchObject({
      secondPinfall: 7,
      total: 10,
    });
  });

  it('should handle strikes', async () => {
    const frameInput = { frame: 'x', index: 0 };
    const response = await frame.get(frameInput);
    expect(response).toMatchObject({
      firstPinfall: 10,
      total: 10,
    });
  });
});
