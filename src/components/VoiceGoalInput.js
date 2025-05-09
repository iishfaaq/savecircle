import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path as needed

const LANGUAGES = {
  en: { label: "English", code: "en-US" },
  ta: { label: "தமிழ்", code: "ta-IN" },
  si: { label: "සිංහල", code: "si-LK" }
};

export default function VoiceGoalInput({ userId, selectedLang = "en" }) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [status, setStatus] = useState('');
  const recognitionRef = useRef(null);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = LANGUAGES[selectedLang].code;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const result = event.results[0][0];
      setTranscript(result.transcript);
      setConfidence(Math.round(result.confidence * 100));
      setShowEdit(true);
      setRecording(false);
    };
    recognition.onerror = () => setRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current && recognitionRef.current.stop();
    setRecording(false);
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await addDoc(collection(db, "goals"), {
        userId,
        transcript,
        lang: selectedLang,
        recordedAt: new Date().toISOString(),
        confidence
      });
      setStatus('Saved!');
      setTimeout(() => setStatus(''), 2000);
      setShowEdit(false);
      setTranscript('');
      setConfidence(null);
    } catch (e) {
      setStatus('Error saving. Try again.');
    }
  };

  return (
    <div style={{ margin: 24 }}>
      <h2>Tell us your savings goal...</h2>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center" }}>
        {!showEdit ? (
          <>
            <button
              style={{
                background: recording ? "#ef4444" : "#2563eb",
                border: "none",
                borderRadius: "50%",
                width: 80,
                height: 80,
                color: "#fff",
                fontSize: 32,
                marginBottom: 16,
                cursor: "pointer"
              }}
              onClick={recording ? stopRecording : startRecording}
            >
              <span role="img" aria-label="mic">🎤</span>
            </button>
            <div>
              {recording ? "Recording... Tap to stop" : "Tap to start recording"}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Transcript:</strong>
              <textarea
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
                rows={3}
                style={{ width: "100%", marginTop: 8, fontSize: 16 }}
              />
            </div>
            <div style={{ marginTop: 8, fontSize: 14, color: "#888" }}>
              Confidence: {confidence ? `${confidence}%` : "N/A"}<br />
              Recorded: Just now
            </div>
            <div style={{ marginTop: 16 }}>
              <button onClick={() => setShowEdit(false)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={handleSave} style={{ background: "#22c55e", color: "#fff" }}>Confirm</button>
            </div>
            {status && <div style={{ marginTop: 8, color: "#2563eb" }}>{status}</div>}
          </>
        )}
      </div>
    </div>
  );
}
