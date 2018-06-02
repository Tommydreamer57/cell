import React, { Component, createRef } from 'react';

export default function Create({ create }) {

    let $check = createRef();

    const onKeyDown = ({ target, key }) => {
        if (key === 'Enter') {
            create(target.value, $check.current.checked);
            target.value = '';
        }
    }

    return (
        <div className='modal-modal' >
            <h3>Create a Channel</h3>
            <input type="text" onKeyDown={onKeyDown} placeholder="enter your channel's name..." />
            <div className='private-button' >
                Private <input ref={$check} onChange={() => console.log($check)} type="checkbox" />
            </div>
        </div>
    );
}
