// HousePoint Banking & Property Mathematics Engine

/**
 * Formats a number to standard Indian Rupee notation (e.g., ₹85,00,000)
 */
export function formatINR(amount) {
  if (isNaN(amount) || amount === null) return '₹0';
  const num = Math.round(amount);
  const isNegative = num < 0;
  const absNumStr = Math.abs(num).toString();
  
  if (absNumStr.length <= 3) {
    return (isNegative ? '-₹' : '₹') + absNumStr;
  }
  
  const lastThree = absNumStr.substring(absNumStr.length - 3);
  const otherNumbers = absNumStr.substring(0, absNumStr.length - 3);
  const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  return (isNegative ? '-₹' : '₹') + formattedOthers + ',' + lastThree;
}

/**
 * Formats in Lakhs or Crores for compact badges (e.g. ₹85.0 L or ₹1.15 Cr)
 */
export function formatCompactINR(amount) {
  if (!amount) return '₹0';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return formatINR(amount);
}

/**
 * Standard Home Loan EMI Formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal, annualRatePercent, tenureMonths) {
  if (!principal || !annualRatePercent || !tenureMonths) return 0;
  const monthlyRate = (annualRatePercent / 12) / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

/**
 * Calculates Maximum Loan Eligibility based on FOIR (Fixed Obligation to Income Ratio)
 * In Indian Banks (SBI/HDFC), max FOIR is typically 50% of net monthly income.
 */
export function calculateMaxLoanEligibility(monthlyIncome, existingEmis = 0, annualRatePercent = 8.40, tenureYears = 20) {
  const tenureMonths = tenureYears * 12;
  // FOIR limit: 50% of income minus existing loan commitments
  const maxAllowableEmi = Math.max(0, (monthlyIncome * 0.50) - existingEmis);
  if (maxAllowableEmi <= 0) return 0;

  const monthlyRate = (annualRatePercent / 12) / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  // P = E * (factor - 1) / (monthlyRate * factor)
  const maxPrincipal = (maxAllowableEmi * (factor - 1)) / (monthlyRate * factor);
  return Math.round(maxPrincipal);
}

/**
 * Prepayment & Part-Payment Impact Calculator
 * Analyzes how much interest is saved and by how many months/years tenure is shortened
 */
export function calculatePrepaymentSavings({
  outstandingBalance,
  interestRate,
  currentEmi,
  lumpSumPrepayment = 0,
  extraMonthlyPayment = 0
}) {
  const monthlyRate = (interestRate / 12) / 100;
  
  // Baseline without prepayment
  let balBaseline = outstandingBalance;
  let totalInterestBaseline = 0;
  let monthsBaseline = 0;
  
  while (balBaseline > 0 && monthsBaseline < 360) {
    const interest = balBaseline * monthlyRate;
    const principal = currentEmi - interest;
    if (principal <= 0) break; // Negative amortization safeguard
    totalInterestBaseline += interest;
    balBaseline -= principal;
    monthsBaseline++;
  }

  // With lump-sum and/or extra monthly payment
  let balPrepay = Math.max(0, outstandingBalance - lumpSumPrepayment);
  let totalInterestWithPrepay = 0;
  let monthsWithPrepay = 0;
  const newMonthlyPayment = currentEmi + extraMonthlyPayment;

  while (balPrepay > 0 && monthsWithPrepay < 360) {
    const interest = balPrepay * monthlyRate;
    const principal = newMonthlyPayment - interest;
    if (principal <= 0) break;
    totalInterestWithPrepay += interest;
    balPrepay -= principal;
    monthsWithPrepay++;
  }

  const interestSaved = Math.max(0, totalInterestBaseline - totalInterestWithPrepay);
  const monthsReduced = Math.max(0, monthsBaseline - monthsWithPrepay);
  const yearsReduced = (monthsReduced / 12).toFixed(1);

  return {
    interestSaved,
    interestSavedFormatted: formatCompactINR(interestSaved),
    monthsReduced,
    yearsReduced,
    originalTenureMonths: monthsBaseline,
    newTenureMonths: monthsWithPrepay
  };
}

/**
 * Property Financial Equity Analysis
 */
export function calculatePropertyEquity({
  purchasePrice,
  downPaymentPaid,
  outstandingLoan,
  annualAppreciationRate = 0.12 // 12% Indian metro benchmark
}) {
  const estimatedCurrentValue = Math.round(purchasePrice * (1 + annualAppreciationRate));
  const amountAlreadyPaid = Math.max(0, estimatedCurrentValue - outstandingLoan);
  const homeEquity = Math.max(0, estimatedCurrentValue - outstandingLoan);
  const equityPercent = Math.min(100, Math.round((homeEquity / estimatedCurrentValue) * 100));

  return {
    purchasePrice,
    downPaymentPaid,
    outstandingLoan,
    estimatedCurrentValue,
    homeEquity,
    equityPercent,
    bankSharePercent: 100 - equityPercent
  };
}
