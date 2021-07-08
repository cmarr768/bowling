const pipe = require('./pipe');

const splitFrame = ({ frame, index }) => ({ rolls: frame.split(''), index });

const getFrameRolls = ({ rolls, index }) => {
  return {
    frame: index + 1,
    firstRoll: rolls[0],
    secondRoll: rolls.length > 1 ? rolls[1] : undefined,
    thirdRoll: rolls.length > 2 ? rolls[2] : undefined,
    hasStrike: rolls.some((r) => r.toLowerCase() === 'x'),
    hasSpare: rolls.some((r) => r.toLowerCase() === '/'),
  };
};

const calculatePinfall = (frame) => {
  const firstPinfall = getPinfall(frame.firstRoll);
  const secondPinfall =
    getPinfall(frame.secondRoll) - (frame.hasSpare ? firstPinfall : 0);
  const thirdPinfall = getPinfall(frame.thirdRoll);
  return {
    ...frame,
    firstPinfall,
    secondPinfall,
    thirdPinfall,
  };
};

const getPinfall = (roll) => {
  if (!roll) return 0;
  switch (roll.toLowerCase()) {
    case '-':
      return 0;
    case 'x':
      return 10;
    case '/':
      return 10;
    default:
      return parseInt(roll);
  }
};

const sumPinfall = (frame) => {
  return {
    ...frame,
    total: frame.firstPinfall + frame.secondPinfall + frame.thirdPinfall,
  };
};

const get = pipe(splitFrame, getFrameRolls, calculatePinfall, sumPinfall);

module.exports = {
  get,
};
