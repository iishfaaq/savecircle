import { differenceInCalendarWeeks, parseISO } from 'date-fns';

function getAISuggestion(goals) {
  // Find the next goal with a due date in the future and not yet completed
  const now = new Date();
  const nextGoal = goals
    .filter(goal => goal.current < goal.target && new Date(goal.due) > now)
    .sort((a, b) => new Date(a.due) - new Date(b.due))[0];

  if (!nextGoal) return null;

  const dueDate = parseISO(nextGoal.due); // or new Date(nextGoal.due) if already a date string
  const weeksLeft = Math.max(1, differenceInCalendarWeeks(dueDate, now));
  const amountLeft = nextGoal.target - nextGoal.current;
  const perWeek = Math.ceil(amountLeft / weeksLeft);

  return `Save ${perWeek} LKR per week to reach your "${nextGoal.name}" goal by ${nextGoal.due}!`;
}

export function getWeeklySuggestion(transactions) {
  // Example: If user saves less on weekends, suggest saving on Sunday
  const weekdaySavings = transactions.filter(
    t => t.type === 'saving' && ![0,6].includes(new Date(t.date).getDay())
  );
  const weekendSavings = transactions.filter(
    t => t.type === 'saving' && [0,6].includes(new Date(t.date).getDay())
  );
  if (weekdaySavings.length > weekendSavings.length) {
    return "Try saving 100 LKR on Sunday to complete your weekly streak!";
  }
  return "Great job with your daily savings habit!";
}
