export function computeWeeklyInsight(data) {
  // data: { saved, target, spending, loan_balance, goal, total_saved, avg_save_saturday, avg_save_weekday }
  const diff = data.target - data.saved;
  const percent_to_goal = (data.total_saved / data.goal) * 100;
  let insight = "";

  if (data.saved >= data.target) {
    insight = `Great job! You met your weekly savings target.`;
  } else {
    const extra = Math.ceil(diff / 7);
    insight = `You're LKR ${diff} below your target. Try saving LKR ${extra} extra daily next week.`;
  }

  if (data.avg_save_saturday !== undefined && data.avg_save_weekday !== undefined && data.avg_save_saturday < data.avg_save_weekday) {
    insight += " You tend to save less on weekends.";
  }

  return {
    en: insight,
    percent_to_goal: percent_to_goal.toFixed(1)
  };
}
