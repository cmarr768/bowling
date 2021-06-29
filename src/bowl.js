/*
frame shape {
  firstRoll: int
  secondRoll: int
  thirdRoll: int
  isStrike: bool
  isSpare: bool
  extraPins: int
  score: int
}
*/

const run = (frames) => {
  let totalScore = 0;
  let game = {};
  const allFrames = frames.split(' ');
  allFrames.forEach((frame, index) => {
    game[index + 1] = getFrame(frame, index);
  });

  console.log('game', Object.values(game));
  const gameArray = Object.values(game);
  gameArray.forEach((f) => {
    if (f.isSpare) {
      const nextFrame = game[f.frame + 1];
      if (nextFrame) {
        f.score += nextFrame.firstRoll;
      }
    }
  });

  console.log('game', Object.values(game));
  const newTotalScore = gameArray.reduce((total, frame) => {
    return total + frame.score;
  }, 0);
  console.log('new total score', newTotalScore);

  return newTotalScore;
};

const getFrame = (frame, index) => {
  const rolls = frame.split('');
  const first = rolls[0];
  const firstRoll = getRoll(first);
  const second = rolls.length > 1 ? rolls[1] : undefined;
  const secondRoll = getRoll(second);
  const third = frames.length > 2 ? rolls[2] : undefined;
  const thirdRoll = getRoll(third);
  const score = firstRoll + secondRoll + thirdRoll;

  return {
    frame: index + 1,
    firstRoll,
    secondRoll,
    thirdRoll,
    score,
    isStrike: isStrike(frame),
    isSpare: isSpare(frame),
  };
};

const getRoll = (roll) => {
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

const isStrike = (frame) => {
  return frame.toLowerCase().indexOf('x') > -1;
};

const isSpare = (frame) => {
  return frame.toLowerCase().indexOf('/') > -1;
};

module.exports = {
  run,
};
