export function analyzeSpending(spending) {
  // Returns array of {category, amount}
  return Object.entries(spending).map(([category, amount]) => ({ category, amount }));
}
