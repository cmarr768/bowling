const frame = require('./frame');
const pipe = require('./pipe');

const getFramesFromCard = (scoreCard) => scoreCard.split(' ');

const transformFrames = async (frames) => {
  return await Promise.all(
    frames.map((frameString, index) => {
      return frame.get({ frame: frameString, index });
    })
  );
};

const adjustPinfall = (frames) => {
  for (const frame of frames) {
    if (frame.frame !== 10) {
      if (frame.hasSpare) {
        frame.additionalPins = frames[frame.frame].firstPinfall;
        frame.total += frame.additionalPins;
      } else if (frame.hasStrike) {
        if (frames[frame.frame].hasStrike) {
          frame.additionalPins =
            frames[frame.frame].firstPinfall +
            (frame.frame === 9
              ? frames[frame.frame].secondPinfall
              : frames[frame.frame + 1].firstPinfall);
          frame.total += frame.additionalPins;
        } else {
          frame.additionalPins =
            frames[frame.frame].firstPinfall +
            frames[frame.frame].secondPinfall;
          frame.total += frame.additionalPins;
        }
      }
    }
  }
  console.log(frames);
  return frames;
};

const calculateTotalScore = (frames) => {
  // console.log(frames);
  return frames.reduce((total, frame) => {
    total += frame.total;
    return total;
  }, 0);
};

const run = pipe(
  getFramesFromCard,
  transformFrames,
  adjustPinfall,
  calculateTotalScore
);

module.exports = {
  run,
};
