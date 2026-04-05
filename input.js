import promptSync from "prompt-sync";

let basicSalary, lumpsumEligibility, lumpsumAmount, tax, epf;

const prompt = promptSync();
basicSalary = Number(prompt("Enter the basic salary : "));
basicSalary = basicSalary.toFixed(2);

lumpsumEligibility = prompt(
  `Are you eligible for a lump sum payment ? Type (Y/N)`,
);

function lumpsumValidation(input) {
  if (input === "Y" || input === "y") {
    calcLumpSumTax();
  }
}

function calcLumpSumTax() {
  console.log("lump sum calc begins...");
  lumpsumAmount = Number(prompt("Enter the lump sum amount : "));
  lumpsumAmount = lumpsumAmount.toFixed(2);
  console.log("lump sum calc close");
}

lumpsumValidation(lumpsumEligibility);
console.log("program close!");
