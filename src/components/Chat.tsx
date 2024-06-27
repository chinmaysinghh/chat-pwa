// src/components/Chat.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message'; // Assuming you have a Message component defined

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    const fetchMessages = async (page: number) => {
        try {
            const response = await axios.get(`https://qa.corider.in/assignment/chat?page=0`);
            console.log('API response:', response.data);

            // Ensure response.data.chats is defined and is an array
            if (response.data && Array.isArray(response.data.chats)) {
                const newMessages = response.data.chats.map((chat: any) => chat.message);
                setMessages(prevMessages => [...prevMessages, ...newMessages]);
            } else {
                console.error('Invalid API response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollTop === 0) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className="chat-container" style={{ maxHeight: '400px', overflowY: 'auto' }} onScroll={handleScroll}>
            {messages.map((message, index) => (
                <Message key={index} content={message} />
            ))}
        </div>
    );
};

export default Chat;
