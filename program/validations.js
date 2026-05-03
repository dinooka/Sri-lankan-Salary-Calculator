export function inputValidationforSalary(grossSalary) {
  if (grossSalary <= 0) {
    console.log("Salary has to be a positive value!");
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
