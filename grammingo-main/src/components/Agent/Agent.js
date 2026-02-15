import React, { useState } from "react";
import "./Agent.css";
import VoiceEmoji from "../voice/VoiceEmoji";

const Agent = () => {
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [grammarText, setGrammarText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState(null);

  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleVoiceInput = (transcript) => {
    setInputText(transcript);
  };

  const handleCorrect = async () => {
    setLoading(true);
    const prompt = `Correct the following text for any spelling mistakes and inappropriate word usage while considering the context. The text may be in Hindi, English, or Hinglish:\n\n"${inputText}"`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
          }),
        }
      );

      const data = await response.json();
      const result = data.choices[0].message.content.trim();
      setCorrectedText(result);
      setActiveResult("correct");
    } catch (error) {
      console.error("Error correcting text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    setLoading(true);
    const prompt = `translate the following hinglish text to english:\n\n"${inputText}"`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
          }),
        }
      );

      const data = await response.json();
      const result = data.choices[0].message.content.trim();
      setTranslatedText(result);
      setActiveResult("translate");
    } catch (error) {
      console.error("error translating text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrammar = async () => {
    setLoading(true);
    const prompt = `check the grammar of the following text and correct it if necessary while preserving its original meaning. the text may be in Hindi, English, or Hinglish:\n\n"${inputText}"`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
          }),
        }
      );

      const data = await response.json();
      const result = data.choices[0].message.content.trim();
      setGrammarText(result);
      setActiveResult("grammar");
    } catch (error) {
      console.error("error checking grammar:", error);
    } finally {
      setLoading(false);
    }
  };

  const results = [
    { type: "correct", title: "Corrected Text", content: correctedText },
    { type: "translate", title: "Translated Text", content: translatedText },
    { type: "grammar", title: "Grammar Corrected Text", content: grammarText },
  ];

  const sortedResults = activeResult
    ? [
        results.find((r) => r.type === activeResult),
        ...results.filter((r) => r.type !== activeResult),
      ]
    : results;

  return (
    <div className="container">
      <h1 className="title">text & grammar correction with translator</h1>
      <VoiceEmoji onVoiceInput={handleVoiceInput} />
      <p style={{ textAlign: "center", margin: 10 }}>OR</p>
      <textarea
        className="input-text"
        placeholder="enter your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="5"
      />

      <div className="button-group">
        <button className="button" onClick={handleCorrect} disabled={loading}>
          correct text
        </button>
        <button
          className="button secondary"
          onClick={handleTranslate}
          disabled={loading}
        >
          translate to english
        </button>
        <button className="button" onClick={handleGrammar} disabled={loading}>
          check grammar
        </button>
      </div>

      {loading && <p className="loading">processing... </p>}
      {sortedResults.map((result) =>
        result.content ? (
          <div key={result.type} className="result fade-in">
            <h2>{result.title}</h2>
            <p>{result.content}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Agent;
