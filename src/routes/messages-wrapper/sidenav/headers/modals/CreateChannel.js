import React, { createRef } from 'react';

export default function Create({ create }) {

    let $check = createRef();
    let $input = createRef();

    const onKeyDown = ({ target, key }) => {
        if (key === 'Enter') {
            create(target.value, $check.current.checked);
            target.value = '';
            $check.current.checked = false;
        }
    }

    const onClick = () => {
        create($input.current.value, $check.current.checked);
        $input.current.value = '';
        $check.current.checked = false;
    }

    return (
        <div className='create-channel modal-modal' >
            <h2>Create a Channel</h2>
            <input ref={$input} type="text" onKeyDown={onKeyDown} placeholder="enter your channel's name..." />
            <div className='private-button' >
                Private <input ref={$check} type="checkbox" />
            </div>
            <button onClick={onClick} >Submit</button>
        </div>
    );
}
