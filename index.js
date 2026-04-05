import promptSync from "prompt-sync";

const internetAllowance = 2000.0;
const welfare = 0.0; // eClubContribution 1500.00
const STAMP_DUTY = 25.0; // Govt. imposed
const width = 35;
let basicSalary,
  lumpsumEligibility,
  lumpsumWithoutTax = 0,
  lumpsumAmount = 0,
  tax,
  epf,
  annualIncome,
  lumpsumTax = 0;

const prompt = promptSync();

function userInputs() {
  basicSalary = Number(prompt("Enter your monthly salary : "));
  basicSalary = basicSalary.toFixed(2);

  if (!inputValidationforSalary(basicSalary)) {
    return;
  }

  lumpsumEligibility = prompt(
    "Are you eligible for a lump sum payment ? Type (Y/N)",
  );

  inputValidationForBonus(lumpsumEligibility);
  printPaySlip();
}

function inputValidationForBonus(input) {
  if (input === "Y" || input === "y") {
    calcLumpSumTax();
  }
}

function inputValidationforSalary(basicSalary) {
  if (basicSalary <= 0) {
    console.log("Salary can't be a negative value!");
    return false;
  } else if (basicSalary > 0 && basicSalary < 30000) {
    console.log(
      "As per SL labour law, monthly basic salary should be greater than 30,000!!!",
    );
    return false;
  }
  return true;
}

function calcEpf() {
  return ((basicSalary - internetAllowance) * 0.08).toFixed(2);
}

function taxTable(basicSalary) {
  if (basicSalary <= 150000) {
    return 0;
  } else if (basicSalary >= 150001 && basicSalary < 233333) {
    return calcTax(basicSalary, 0.06, 108000 / 12);
  } else if (basicSalary >= 233334 && basicSalary < 275000) {
    return calcTax(basicSalary, 0.18, 444000 / 12);
  } else if (basicSalary >= 275001 && basicSalary < 316666) {
    return calcTax(basicSalary, 0.24, 642000 / 12);
  } else if (basicSalary >= 316667 && basicSalary < 358333) {
    return calcTax(basicSalary, 0.3, 870000 / 12);
  } else if (basicSalary > 358334) {
    return calcTax(basicSalary, 0.36, 1128000 / 12);
  }
}

function calcTax(basicSalary, rate, k) {
  return (basicSalary * rate - k).toFixed(2);
}

function calcLumpSumTax() {
  lumpsumWithoutTax = Number(prompt("Enter the lump sum amount : "));
  lumpsumWithoutTax = Number(lumpsumWithoutTax.toFixed(2));

  annualIncome = (basicSalary * 12).toFixed(2);
  let total = Number(annualIncome) + Number(lumpsumWithoutTax);

  if (total <= 1800000) {
    lumpsumTax = 0;
  } else if (total > 1800000 && total <= 2800000) {
    lumpsumTax = lumpsumWithoutTax * 0.06;
  } else if (total > 2800000 && total <= 3300000) {
    lumpsumTax = lumpsumWithoutTax * 0.18;
  } else if (total > 3300000 && total <= 3800000) {
    lumpsumTax = lumpsumWithoutTax * 0.24;
  } else if (total > 3800000 && total <= 4300000) {
    lumpsumTax = lumpsumWithoutTax * 0.3;
  } else if (total > 4300000) {
    lumpsumTax = lumpsumWithoutTax * 0.36;
  }

  lumpsumAmount = Number(lumpsumWithoutTax) - Number(lumpsumTax);
}

function printPaySlip() {
  let totalEarning = (Number(basicSalary) + Number(lumpsumWithoutTax)).toFixed(
    2,
  );

  epf = calcEpf();
  tax = taxTable(basicSalary);
  let netSalary =
    basicSalary -
    (Number(epf) + Number(tax) + Number(STAMP_DUTY) + Number(welfare)) +
    Number(lumpsumAmount);
  netSalary = netSalary.toFixed(2);

  let totalTax = Number(lumpsumTax) + Number(tax);

  const earnings = {
    "Gross Salary(including allowances)": basicSalary,
    "Internet Allowance": internetAllowance.toFixed(2),
    "Total Lumpsum ": lumpsumWithoutTax.toFixed(2),
    "Total Earnings ": totalEarning,
  };
  console.log("\nEARNINGS\n");
  const valueWidth = Math.max(...Object.values(earnings).map((v) => v.length));
  for (const key in earnings) {
    const value = earnings[key];
    const alignedValue = " ".repeat(valueWidth - value.length) + value;
    console.log(key.padEnd(width) + " = " + alignedValue);
  }

  let totalDeductions =
    Number(totalTax) + Number(STAMP_DUTY) + Number(epf) + Number(welfare);

  const deductions = {
    "Personal Income Tax": tax,
    "Lump Sum Tax": lumpsumTax.toFixed(2),
    "Total Tax": totalTax.toFixed(2),
    "Stamp Duty": STAMP_DUTY.toFixed(2),
    "EPF Employee Contribution": epf,
    Welfare: welfare.toFixed(2),
    "Total Deduction": totalDeductions.toFixed(2),
    "Net Salary": netSalary,
  };
  console.log("\nDEDUCTIONS\n");
  for (const key in deductions) {
    const value = deductions[key];
    const alignedValue = " ".repeat(valueWidth - value.length) + value;
    console.log(key.padEnd(width) + " = " + alignedValue);
  }
}

// Invoke functions after this line
// ------------------------------------------------------------------------
userInputs();
