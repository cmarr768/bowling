const run = (frames) => {
  let totalScore = 0;
  frames.forEach((frame) => {
    const first = frame.charAt(0);
    const second = frame.length > 1 ? frame.charAt(1) : 0;
    console.log(first, second);
    const score = parseInt(first) + parseInt(second);
    console.log(score);
    totalScore += score;
  });
  return totalScore;
};

module.exports = {
  run,
};
