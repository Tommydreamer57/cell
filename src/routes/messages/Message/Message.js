import React from 'react';

export default function Message({ message }) {
    return (
        <div className="message" >
            <div className="image-wrapper">
                <img src={message.img} />
            </div>
            <div>
                <span>
                    <h5>{message.first_name} {message.last_name}</h5>
                    <h6>{message.timestamp}</h6>
                </span>
                <span>{message.text}</span>
            </div>
        </div>
    );
}
