import React, { Component } from 'react';

export default function Create({ create }) {
    const onKeyDown = ({ target, key }) => {
        if (key === 'Enter') {
            create(target.value);
            target.value = '';
        }
    }
    return (
        <div id="create" >
            <input onKeyDown={onKeyDown} />
        </div>
    );
}
