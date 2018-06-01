import React from 'react';

export default function MessageHover({ toggleEdit, _delete, star, own }) {
    return (
        <div className="message-hover" >
            <button onClick={star} >Star</button>
            {own && <button onClick={toggleEdit} >Edit</button>}
            {own && <button onClick={_delete} >Delete</button>}
        </div>
    );
}
