
import React from 'react';

interface MessageProps {
    content: string;
}

const Message: React.FC<MessageProps> = ({ content }) => {
    return (
        <div className="message">
            {content}
        </div>
    );
};

export default Message;
