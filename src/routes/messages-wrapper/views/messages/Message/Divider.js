import React from 'react';
import { toDate } from '../../../../date-parser';

export default function Divider({ date, isNewMessageDivider }) {
    if (isNewMessageDivider) return (
        <div className="divider notification">
            <h6>New Messages</h6>
            <div className='divider-line' />
        </div>
    ); else return (
        <div className="divider" >
            <h6>{toDate(date)}</h6>
            <div className='divider-line' />
        </div>
    );
}
