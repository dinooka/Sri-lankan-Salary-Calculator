import promptSync from "prompt-sync";
import {
  isYesOrNo,
  inputValidationforSalary,
  inputValidationforNumber,
} from "./validations.js";

import {
  calcEpf,
  taxAmount,
  calcGrossSalary,
  calcLumpSumTax,
  calcTotalEarnings,
  calcTotalTax,
  calcTotalDeductions,
  calcNetSalary,
} from "./calulations.js";

import { printPaySlip } from "./printresults.js";

const STAMP_DUTY = 25.0; // Govt. imposed
const width = 35;
let basicSalary,
  allowance = 0,
  welfare = 0, // eClubContribution 1500.00
  lumpsumEligibility,
  lumpsumWithoutTax = 0,
  taxAmountForGrossSalary = 0,
  epf,
  grossSalary = 0,
  lumpsumTax = 0;

const prompt = promptSync();

function userInputs() {
  basicSalary = Number(
    prompt("Enter the monthly basic salary" + "\t".repeat(4) + ": "),
  );
  if (!inputValidationforSalary(basicSalary)) {
    return;
  }

  allowance = Number(
    prompt("Enter Allowances(if applicable only)" + "\t".repeat(3) + ": "),
  );
  if (!inputValidationforNumber(allowance)) {
    return;
  }
  // basicSalary += allowance;

  welfare = Number(
    prompt("Enter any other contributions(societies/clubs/welfare) \t: "),
  );
  if (!inputValidationforNumber(welfare)) {
    return;
  }

  lumpsumEligibility = prompt(
    `Are you eligible for a lump sum payment ? Type (Y/N) \t: `,
  );

  lumpsumWithoutTax = isYesOrNo(lumpsumEligibility);
  return true;
}

function calculations() {
  grossSalary = calcGrossSalary(basicSalary, allowance);
  epf = calcEpf(basicSalary);
  taxAmountForGrossSalary = taxAmount(grossSalary);
  lumpsumTax = calcLumpSumTax(lumpsumWithoutTax, grossSalary);
  let totalEarnings = calcTotalEarnings(grossSalary, lumpsumWithoutTax);
  let totalTax = calcTotalTax(lumpsumTax, taxAmountForGrossSalary);
  let totalDeductions = calcTotalDeductions(totalTax, STAMP_DUTY, epf, welfare);
  let netSalary = calcNetSalary(totalEarnings, totalDeductions);

  const earnings = {
    "Basic Salary": basicSalary.toFixed(2),
    Allowance: allowance.toFixed(2),
    "Total Lumpsum ": lumpsumWithoutTax.toFixed(2),
    "Total Earnings ": totalEarnings,
  };

  console.log("\nEARNINGS\n");
  printPaySlip(earnings);

  const deductions = {
    "Personal Income Tax": taxAmountForGrossSalary.toFixed(2),
    "Lump Sum Tax": lumpsumTax.toFixed(2),
    "Total Tax": totalTax.toFixed(2),
    "Stamp Duty": STAMP_DUTY.toFixed(2),
    "EPF Employee Contribution": epf.toFixed(2),
    Welfare: welfare.toFixed(2),
    "Total Deduction": totalDeductions.toFixed(2),
    "Net Salary": netSalary,
  };
  console.log("\nDEDUCTIONS\n");
  printPaySlip(deductions);
}

if (userInputs()) {
  calculations();
}
