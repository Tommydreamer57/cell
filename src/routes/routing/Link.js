import React from 'react';

export default function Link(props) {
    return (
        <a href={window.location.origin + props.to} >
            {props.children}
        </a>
    );
}
