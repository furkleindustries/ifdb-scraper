const decimalRe = /(^\d+)?(\.\d+)?-?(\d+(\.\d+)?)?$/;
const integerRe = /(^\d+)?-?(\d+)?$/;

module.exports = (range, decimalsAllowed) => {
  if (!range ||
      /^-+$/.test(range) ||
      (decimalsAllowed && !decimalRe.test(range)) ||
      (!decimalsAllowed && !integerRe.test(range)))
  {
    throw new Error(`Invalid range: ${range}`);
  }

  return range;
};
