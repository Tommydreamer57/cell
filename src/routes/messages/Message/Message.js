import React from 'react';

export default function Message({ message }) {
    return (
        <div className="message" >
            @{message.username}: "{message.text}" {message.timestamp}            
        </div>
    );
}
