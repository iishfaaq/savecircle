export async function fetchAISuggestion(weeklyData) {
  const res = await fetch('http://localhost:5000/weekly-insight', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(weeklyData)
  });
  const data = await res.json();
  return data.insight;
}
