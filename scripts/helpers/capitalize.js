/**
 *
 * @param { A string that is going to be capitalize } string
 * @returns returns a capitalized sentence or word
 */

// A function to capitalize every first letter of a word
const capitalize = (string) => {
  return string.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
};

module.exports = {
  capitalize,
};
