import promptSync from "prompt-sync";
const internetAllowance = 2000.0;
const welfare = 0.0; // eClubContribution 1500.00
const STAMP_DUTY = 25.0; // Govt. imposed

let basicSalary, tax, epf;

const prompt = promptSync();
basicSalary = Number(prompt("Enter the basic salary : "));
basicSalary = basicSalary.toFixed(2);

function inputValidation(basicSalary) {
  if (basicSalary <= 0) {
    console.log("Salary can't be a negative value!");
    return false;
  } else if (basicSalary > 0 && basicSalary < 30000) {
    console.log(
      "As per SL labour law, monthly basic salary should be greater than 30,000!!!",
    );
    return false;
  } else {
    return true;
  }
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

function printPaySlip() {
  if (!inputValidation(basicSalary)) {
    return;
  }
  epf = calcEpf();
  console.log(`Internet Allowance = ${internetAllowance}`);
  console.log(`EPF Deduction\t = ${epf}`);
  tax = taxTable(basicSalary);
  console.log(`Tax Deduction\t = ${tax}`);
  console.log(`Stamp Duty\t = ${STAMP_DUTY}`);
  console.log(`Welfare\t\t = ${welfare}`);
  let netSalary =
    basicSalary -
    (Number(epf) + Number(tax) + Number(STAMP_DUTY) + Number(welfare));
  console.log(`\n\nNet Salary \t = ${netSalary.toFixed(2)}\n`);
}

// Invoke functions after this line
// ------------------------------------------------------------------------

printPaySlip();
