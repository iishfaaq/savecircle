export function parseGoalTranscript(transcript) {
  // Example: "I want to save 5000 rupees for a new bicycle by August 30th."
  const amountMatch = transcript.match(/(\d{2,})\s*(rupees|lkr)?/i);
  const amount = amountMatch ? parseInt(amountMatch[1], 10) : null;

  // Simple category extraction (expand as needed)
  let category = null;
  if (/bicycle|bike/i.test(transcript)) category = "Transport";
  else if (/food|grocer|meal|lunch|dinner/i.test(transcript)) category = "Food";
  else if (/health|doctor|medicine/i.test(transcript)) category = "Healthcare";
  else if (/gift/i.test(transcript)) category = "Gift";
  // Add more categories as needed

  // Date extraction (very basic, for demo)
  const dateMatch = transcript.match(/by\s+([A-Za-z]+\s*\d{1,2}(?:th|st|nd|rd)?)/i);
  const due = dateMatch ? dateMatch[1] : null;

  return { amount, category, due };
}
