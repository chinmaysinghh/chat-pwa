// src/services/chatService.ts
import axios from 'axios';

export const fetchMessages = async (page: number) => {
    const response = await axios.get(`https://qa.corider.in/assignment/chat?page=0`);
    return response.data;
};
