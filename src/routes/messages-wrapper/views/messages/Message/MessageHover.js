import React from 'react';
import p from '../../../../../styles/presets';


export default function MessageHover({ toggleEdit, _delete, star, own }) {

    return (
        <div className="message-hover" >
            <button onClick={star} >
            <i className="far fa-star hover-icon"></i>
            </button>
            {own && <button onClick={toggleEdit} ><i class="far fa-edit hover-icon"></i></button>}
            {own && <button onClick={_delete}><i class="far fa-trash-alt hover-icon"></i></button>}
        </div>
    );
}
