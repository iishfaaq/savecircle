export async function translateToEnglish(text, sourceLang, apiKey) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const body = {
    q: text,
    source: sourceLang,
    target: "en",
    format: "text"
  };
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.json();
  return data.data.translations[0].translatedText;
}
