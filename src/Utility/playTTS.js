export function playTTS(text, lang) {
  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.lang = lang; // 'en-US', 'ta-IN', 'si-LK'
  window.speechSynthesis.speak(utterance);
}
