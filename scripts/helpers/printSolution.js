const { capitalize } = require("./capitalize");
const colors = require("colors");

/**
 *
 * @param { array of drivers } drivers
 * @param { array of addresses} addresses
 * @param { matrix of the best correspondance, where the first index is indicating the driver and second one the address to assign } solution
 * @param { the total sum of every ss } count
 */
const printSolution = (drivers, addresses, solution, count) => {
  console.log("The total sum of ss:".green, colors.italic(count), "\n");
  // Iterating thru the matrix of correspondance and accesing the driver and address thru that iteration
  let i = 1;
  solution.forEach((row) => {
    // Console logging the result
    console.log(
      colors.bold(i) + ".",
      "Driver:".yellow,
      capitalize(drivers[row[0]]).italic + ", " + "Address:".yellow,
      capitalize(addresses[row[1]]).italic
    );
    i++;
  });
};

module.exports = {
  printSolution,
};
