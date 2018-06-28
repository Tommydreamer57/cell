import React, { createRef } from 'react';

export default function Create({ create }) {
    const input = createRef();
    const onKeyDown = ({ target, key }) => {
        if (key === 'Enter') {
            create(target.value);
            target.value = '';
        }
    }
    const onClick = () => {
        create(input.current.value);
        input.current.value = '';
    }
    return (
        <div className="create" >
            <h2>Create an Organization</h2>
            <input ref={input} onKeyDown={onKeyDown} placeholder="enter your organization's name..." />
            <button onClick={onClick} >Submit</button>
        </div>
    );
}
