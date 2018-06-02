import React from 'react';
import { toDate } from '../../../../date-parser';

export default function Divider({ date }) {
    return (
        <div className="divider" >
            <h6>{toDate(date)}</h6>
        </div>
    );
}
