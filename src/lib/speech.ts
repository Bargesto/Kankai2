export function speakText(text: string) {
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'tr-TR'; // Set language to Turkish
  utterance.rate = 0.9; // Slightly slower rate for better clarity
  utterance.pitch = 1.1; // Slightly higher pitch for a friendly voice

  window.speechSynthesis.speak(utterance);
}