import promptSync from "prompt-sync";

const prompt = promptSync();

export function inputValidationforSalary(grossSalary) {
  if (grossSalary <= 0) {
    console.log("Salary can't be a negative value!");
    return false;
  } else if (!Number.isFinite(grossSalary)) {
    console.log("Salary has to be a numeric value!");
    return false;
  } else if (grossSalary > 0 && grossSalary < 30000) {
    console.log(
      "As per SL labour law, monthly basic salary should be greater than 30,000!!!",
    );
    return false;
  }
  return true;
}

export function inputValidationforNumber(amount) {
  if (amount < 0 || !Number.isFinite(amount)) {
    console.log("Value has to be a positive number!");
    return false;
  }
  return true;
}

export function isYesOrNo(input) {
  if (input === "Y" || input === "y") {
    let lumpsumWithoutTax = Number(
      prompt("Enter the lump sum amount" + "\t".repeat(4) + ": "),
    );
    if (inputValidationforNumber(lumpsumWithoutTax)) {
      return lumpsumWithoutTax;
    }
    return 0;
  }
  return 0;
}
