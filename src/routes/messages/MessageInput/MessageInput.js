import React from 'react';

export default function MessageInput({ onKeyDown }) {
    return (
        <div className="message-input" >
            <div className="input-wrapper">
                <button className="plus-button">+</button>
                <input onKeyDown={onKeyDown} />
            </div>
        </div>
    );
}
