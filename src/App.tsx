import React, { useState, useEffect } from 'react';
import './App.css';

interface Sender {
  image: string;
  is_kyc_verified: boolean;
  self: boolean;
  user_id: string;
}

interface Chat {
  id: string;
  message: string;
  sender: Sender;
  time: string;
}

interface ChatData {
  chats: Chat[];
  from: string;
  to: string;
  name: string;
}

function App() {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://qa.corider.in/assignment/chat?page=0')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ChatData) => {
        setChatData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chatData) return null;

  return (
    <div className="App">
      <header className="header">
        <button className="back-button">←</button>
        <h2>{chatData.name}</h2>
        <button className="edit-button">✏️</button>
      </header>
      <div className="trip-info">
        <div className="avatar" style={{backgroundImage: `url(${chatData.chats[0].sender.image})`}}></div>
        <div className="from-to">
          <div>From {chatData.from}</div>
          <div>To {chatData.to}</div>
        </div>
        <button className="options-button">⋮</button>
      </div>
      <div className="chat-container">
        {chatData.chats.map((chat, index) => (
          <div key={index} className={`message ${chat.sender.self ? 'user-message' : 'other-message'}`}>
            {chat.message}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input type="text" placeholder="Reply to @Rohit Yadav" />
        <button className="attachment-button">📎</button>
        <button className="send-button">➤</button>
      </div>
    </div>
  );
}

export default App;