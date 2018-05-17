import React from 'react';
import { link } from '../../meiosis-router';
import { SideNav } from '../../styles/components';
import { getId, getMatch } from '../../routes/url-parser';
import Dropdown from './Dropdown';
import Modal from '../Modal/Modal';

export default function create(update) {
    function toggleModal() {
        update(model => ({
            ...model,
            modal: arguments.length > 0 ? arguments[0] : !model.modal,
            undef: console.log(model)
        }));
    }
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            let currentId = getId();
            let match = getMatch();
            return (
                <SideNav id="sidenav" >
                    <Dropdown model={model} update={update} />
                    <button onClick={toggleModal} ><h5 className="channel-link" >Channels +</h5></button>
                    <Modal
                        toggle={toggleModal}
                        open={model.modal}
                        inputs={[{
                            name: 'Channel Name',
                            placeholder: 'Give your channel a name'
                        }, {
                            name: 'Private?',
                            placeholder: false
                        }]}
                        title="Create A Channel"
                        subtitle=""
                    />
                    {channels.map(channel => link(model, `/messages/channel/${channel.id}`,
                        <div className={`channel-link ${match === 'channel' && channel.id === currentId ? 'selected' : ''}`} >
                            {channel.private ? '$' : '#'} {channel.name}
                        </div>
                    ))}
                </SideNav>
            );
        }
    };
}
