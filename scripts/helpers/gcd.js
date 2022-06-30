/**
 *
 * @param { The length of the address that is passed as an arg } a
 * @param { The length of the driver that is passed as an arg } b
 * @returns A number that indicates wheter it has a gcd
 */

// Calculates the greatest common divisor between two numbers (Recursion)
const gcd = (a, b) => {
  // when b is equal to 0. Return a
  if (!b) {
    return a;
  }
  // When recursing, it swaps the input arguments but we pass the remainder of a / b as the second argument.
  return gcd(b, a % b);
};

module.exports = {
  gcd,
};
