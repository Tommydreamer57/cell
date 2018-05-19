import React from 'react';
import { link } from '../../meiosis-router';
import { SideNav } from '../../styles/components';
import { getId, getMatch } from '../../routes/url-parser';
import Dropdown from './Dropdown';
import Modal from '../Modal/Modal';
import { POST } from '../../http';
import createDrag from './drag';

export default function create(update) {
    // MODAL
    const modalProps = {
        title: 'Create A Channel',
        subtitle: '',
        toggle: toggleModal,
        submit,
        inputs: [{
            name: 'Channel Name',
            placeholder: 'Give your channel a name',
            type: 'text'
        }, {
            name: 'Private?',
            placeholder: false,
            type: 'radio'
        }]
    };
    // FUNCTIONS
    function toggleModal() {
        console.log(arguments);
        update(model => ({
            ...model,
            currentModal: typeof arguments[0] === 'string' ? arguments[0] : null,
        }));
    }
    function submit(data, organisation_id) {
        console.log(data);
        console.log(organisation_id);
        let [nameKey, _privateKey] = modalProps.inputs.map(({ name }) => name);
        let name = data[nameKey];
        let _private = data[_privateKey];
        console.log({ organisation_id, name, _private });
        return POST.channel(update, organisation_id, name, _private)
            .then(res => {
                update(model => ({
                    ...model,
                    currentModal: null
                }));
                return res;
            })
            .catch(console.log);
    }
    // CHILDREN
    let drag = createDrag(update);
    // COMPONENT
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            let currentId = getId();
            let match = getMatch();
            return (
                <SideNav id="sidenav" style={{ width: model.sideWidth }} >
                    {/* DROPDOWN HEADER */}
                    <Dropdown
                        model={model}
                        update={update}
                    />
                    {/* CREATE CHANNEL */}
                    <button onClick={() => toggleModal(modalProps.title)} >
                        <h5 className="channel-link" ><div>Channels</div><div> +</div></h5>
                    </button>
                    {/* MODAL -- OFF SCREEN */}
                    <Modal
                        current={model.currentModal}
                        organisation_id={model.organisation.id}
                        {...modalProps}
                    />
                    {/* CHANNEL LIST */}
                    {channels.filter(channel => channel.members.some(id => id === model.user.id)).map(channel => link(model, `/messages/channel/${channel.id}`,
                        <div className={`channel-link ${match === 'channel' && channel.id === currentId ? 'selected' : ''}`} >
                            {channel.private ? '$' : '#'} {channel.name}
                        </div>
                    ))}
                    {/* DRAGGABLE SIDE */}
                    {drag.view(model)}
                </SideNav>
            );
        }
    };
}
