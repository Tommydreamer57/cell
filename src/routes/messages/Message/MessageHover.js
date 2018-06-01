import React from 'react';



export default function MessageHover({ toggleEdit, _delete, star, own }) {
    const starStyles = {
        borderRadius: 6,
        borderTopRightRadius: own ? 0 : 6,
        borderBottomRightRadius: own ? 0 : 6,
        borderRight: own ? '1px solid gray' : 'none'
    }

    const editStyles = {
        borderRadius: 0
    }

    const deleteStyles = {
        borderRadius: 6,
        borderTopLeftRadius: own ? 0 : 6,
        borderBottomLeftRadius: own ? 0 : 6,
        borderLeft: own ? '1px solid gray' : 'none'
    }

    return (
        <div className="message-hover" >
            <button onClick={star} style={starStyles}>
            <i className="far fa-star hover-icon"></i>
            </button>
            {own && <button onClick={toggleEdit} style={editStyles}><i class="far fa-edit hover-icon"></i></button>}
            {own && <button onClick={_delete} style={deleteStyles}><i class="far fa-trash-alt hover-icon"></i></button>}
        </div>
    );
}
