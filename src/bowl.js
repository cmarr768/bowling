const run = (frames) => {
  let totalScore = 0;
  frames.forEach((frame) => {
    const first = frame.charAt(0);
    const second = frame.length > 1 ? frame.charAt(1) : 0;
    console.log(first, second);
    const firstRoll = first === '-' ? 0 : parseInt(first);
    const secondRoll = second === '-' ? 0 : parseInt(second);
    const score = firstRoll + secondRoll;
    console.log(score);
    totalScore += score;
  });
  return totalScore;
};

module.exports = {
  run,
};
