"use client";

import React, { useState } from 'react';
import { useAction } from 'convex/react';
import { generatePath } from '../../convex/chatbot';
import { api } from '@/convex/_generated/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const generatePathAction = useAction(api.chatbot.generatePath);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    const response = await generatePathAction({ message: input });
    const botMessage = { role: 'bot', content: response.answer };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
