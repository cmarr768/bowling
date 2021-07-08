const pipe =
  (...fns) =>
  async (x) =>
    await fns.reduce(async (y, f) => await f(y.then ? await y : y), x);

module.exports = pipe;
