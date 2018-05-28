import React from 'react';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import createCreate from './create';
import createJoin from './join';

export default function create(update) {
    let create = createCreate(update);
    let join = createJoin(update);
    return {
        view(model) {
            return (
                <div className="dropdown" >
                    {/* DROPDOWN */}
                    <Dropdown
                        className="header"
                        type="channel"
                        title="Channels"
                    >
                        {create.buttonView(model)}
                        {join.buttonView(model)}
                    </Dropdown>
                    {create.modalView(model)}
                    {join.modalView(model)}
                </div>
            );
        }
    }
}
