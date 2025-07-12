// src/GeminiChat.js
import React, { useState } from 'react';

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';

      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Error contacting Gemini API.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>💬 Gemini Chat</h2>
      <div style={{ height: 400, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '10px 0',
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Gemini'}:</strong> {msg.text}
          </div>
        ))}
        {isTyping && <div><em>Gemini is typing...</em></div>}
      </div>

      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage} disabled={isTyping} style={{ padding: '8px 16px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default GeminiChat;
