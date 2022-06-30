const fs = require("fs");
const munkres = require("munkres-js");
const { gcd } = require("./helpers/gcd");
const { printSolution } = require("./helpers/printSolution");
const arrays = require("./helpers/characters");

let vowels = arrays.vowels;
let consonants = arrays.consonants;
let numbers = arrays.numbers;
let matrix = [];

/**
 *
 * @returns An array with an array of addresses and an array of drivers
 */
const readFiles = async () => {
  // Reading the file addresses and splitting with enters
  let addresses = (await fs.promises.readFile("addresses.txt", "utf-8")).split(
    "\r"
  );
  // Reading the file drivers and splitting with enters
  let drivers = (await fs.promises.readFile("drivers.txt", "utf-8")).split(
    "\r"
  );

  addresses = addresses.map((address) => address.trim().toLowerCase()); // lowercasing and trimming every address in the addresses array
  drivers = drivers.map((driver) => driver.trim().toLowerCase()); // lowercasing and trimming every driver in the drivers array

  return [addresses, drivers];
};

/**
 *
 * @param { A string that contains the address } address
 * @param { A string that contains the driver } driver
 * @returns the ss depending on the test case and the pair of address and driver
 */
const suitabilityScore = (address, driver) => {
  let ss = 0;

  try {
    if (
      typeof address === "string" &&
      typeof driver === "string" &&
      address.length > 0 &&
      driver.length > 0
    ) {
      // If the length of the address is even then it returns the number of vowels of the driver by 1.5
      if (address.length % 2 == 0) {
        for (let letter of driver) {
          vowels.includes(letter) && ss++; // Checking if that iteration (letter) its in vowels array
        }
        ss *= 1.5;
      } else {
        // If the address length is odd then just return the number of consonants of the driver
        for (let letter of driver) {
          if (consonants.includes(letter)) {
            ss++; // // Checking if that iteration (letter) its not in vowels array
          }
        }
      }

      // If both data has a common factor then it should multiply the ss by 1.5, if the return of the function is diff than 1 then it has a commmon factor
      if (gcd(address.length, driver.length) != 1) {
        ss *= 1.5;
      }

      // Returning the final result of ss
      return ss;
    } else {
      console.log("Not a valid address or driver\n");
      return ss;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

readFiles()
  .then((response) => {
    let addresses = response[0]; // Assigning the array of address into a var called addresses
    let drivers = response[1]; // Assigning the array of drivers into a var called drivers
    let count = 0;

    //  Iterating thru every driver until every driver iterates thru every address, so it has every combination possible
    drivers.forEach((driver) => {
      let row = []; // Creating a row to create the matrix of combinations
      addresses.forEach((address) => {
        row.push(-suitabilityScore(address, driver)); // Pushing the values into the row after getting the return of ss, with the iteration
      });
      matrix.push(row); // Pushing the row into the matrix
    });

    // Getting the total sum of suitability score
    matrix.forEach((row) => {
      row.forEach((number) => (count += -number));
    });

    const solution = munkres(matrix); // Calling the munkres library that is doing the hungarian method

    printSolution(drivers, addresses, solution, count);
  })
  .catch((err) => console.log(err))
  .finally(console.clear(), console.log("\nSuitability Score\n"));
