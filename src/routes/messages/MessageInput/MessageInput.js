import React from 'react';

export default function MessageInput({ onKeyDown, ...props }) {
    return (
        <div className="message-input" {...props} >
            <div className="input-wrapper">
                <button className="plus-button">+</button>
                <input onKeyDown={onKeyDown} />
            </div>
        </div>
    );
}
