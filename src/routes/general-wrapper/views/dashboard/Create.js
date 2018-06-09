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
            <h3>Create an Organization</h3>
            <input onKeyDown={onKeyDown} placeholder="enter your organization's name..." />
        </div>
    );
}
