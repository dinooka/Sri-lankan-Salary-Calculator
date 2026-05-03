import {
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

import { printPaySlip, printPaySlipToHtml } from "./printresults.js";

const STAMP_DUTY = 25.0; // Govt. imposed
const width = 35;
let lumpsumEligibility,
  taxAmountForGrossSalary = 0,
  epf,
  grossSalary = 0,
  lumpsumTax = 0;
let basicSalary = 0,
  allowance = 0,
  welfare = 0,
  lumpsumWithoutTax = 0;

const inputs = document.querySelectorAll(".numeric-only");
const basicSalaryElement = document.getElementById("basic-salary");
const allowanceElement = document.getElementById("allowance");
const welfareElement = document.getElementById("welfare");
const lumpsumWithoutTaxElement = document.getElementById("lumpsum");
const calculate = document.getElementById("calulate");
const earningsText = document.getElementById("earnings");
const earningsDetails = document.getElementById("earnings-values");
const container = document.getElementById("payslip");

document.addEventListener("DOMContentLoaded", function () {
  inputs.forEach((input) => {
    input.addEventListener("keydown", function (e) {
      // ✅ allow Ctrl/Cmd shortcuts (copy, paste, cut, select all)
      if (e.ctrlKey || e.metaKey) {
        return;
      }
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];

      if (allowedKeys.includes(e.key)) return;
      // allow digits
      if (/^\d$/.test(e.key)) return;

      // allow ONE decimal point
      if (e.key === "." && !this.value.includes(".")) return;

      e.preventDefault();
    });
    // ✅ paste validation (ONLY allow valid numbers)
    input.addEventListener("paste", function (e) {
      const pasteData = e.clipboardData.getData("text").trim();

      // allow: 123, 123.45, 0.5
      const isValidNumber = /^\d+(\.\d+)?$/.test(pasteData);

      if (!isValidNumber) {
        e.preventDefault();
      }
    });
  });
  calculate.addEventListener("click", function () {
    container.innerHTML = "";
    basicSalary = Number(basicSalaryElement.value);
    allowance = Number(allowanceElement.value);
    welfare = Number(welfareElement.value);
    lumpsumWithoutTax = Number(lumpsumWithoutTaxElement.value);
    console.log("Gross Salary = ", basicSalary);
    if (userInputs()) {
      calculations();
    }
  });
});

function userInputs() {
  if (!inputValidationforSalary(basicSalary)) {
    return;
  }

  if (!inputValidationforNumber(allowance)) {
    return;
  }

  if (!inputValidationforNumber(welfare)) {
    return;
  }

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
  // earningsText.innerText = `\nEARNINGS\n`;
  printPaySlip(earnings);
  printPaySlipToHtml(earnings, "EARNINGS");

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
  printPaySlipToHtml(deductions, "DEDUCTIONS");
}
