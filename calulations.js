export function calcEpf(basicSalary) {
  return Number((basicSalary * 0.08).toFixed(2));
}

export function calcGrossSalary(basicSalary, allowance) {
  return Number(basicSalary) + Number(allowance);
}

export function taxAmount(grossSalary) {
  if (grossSalary <= 150000) {
    return 0;
  } else if (grossSalary >= 150001 && grossSalary < 233333) {
    return calcSalaryTax(grossSalary, 0.06, 108000 / 12);
  } else if (grossSalary >= 233334 && grossSalary < 275000) {
    return calcSalaryTax(grossSalary, 0.18, 444000 / 12);
  } else if (grossSalary >= 275001 && grossSalary < 316666) {
    return calcSalaryTax(grossSalary, 0.24, 642000 / 12);
  } else if (grossSalary >= 316667 && grossSalary < 358333) {
    return calcSalaryTax(grossSalary, 0.3, 870000 / 12);
  } else if (grossSalary > 358334) {
    return calcSalaryTax(grossSalary, 0.36, 1128000 / 12);
  }
}

function calcSalaryTax(grossSalary, rate, k) {
  return Number((grossSalary * rate - k).toFixed(2));
}

export function calcLumpSumTax(lumpsumWithoutTax, basicSalary) {
  let lumpsumTax = 0;
  let annualIncome = (basicSalary * 12).toFixed(2);
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

  // lumpsumAmount = Number(lumpsumWithoutTax - Number(lumpsumTax.toFixed(2)));
  return lumpsumTax;
}

export function calcTotalEarnings(basicSalary, lumpsumWithoutTax) {
  // lumpsumAmount = lumpsumWithoutTax - lumpsumTax;
  return (Number(basicSalary) + Number(lumpsumWithoutTax)).toFixed(2);
}

export function calcTotalTax(lumpsumTax, taxAmountForGrossSalary) {
  return Number(lumpsumTax) + Number(taxAmountForGrossSalary);
}

export function calcTotalDeductions(totalTax, stampduty, epf, welfare) {
  let deductions =
    Number(totalTax) + Number(stampduty) + Number(epf) + Number(welfare);
  return deductions;
}

export function calcNetSalary(totalEarnings, totalDeductions) {
  let netSalary = Number(totalEarnings) - Number(totalDeductions);
  return netSalary.toFixed(2);
}
