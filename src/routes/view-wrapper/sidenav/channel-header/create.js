import React from 'react';
import { POST } from '../../../../http';
import Modal from '../../../../components/Modal/Modal';

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
        update(model => ({
            ...model,
            currentModal: typeof arguments[0] === 'string' ? arguments[0] : null,
        }));
    }
    function submit(data, organisation_id) {
        let [nameKey, _privateKey] = modalProps.inputs.map(({ name }) => name);
        let name = data[nameKey];
        let _private = data[_privateKey];
        return POST.newChannel(update, organisation_id, name, _private)
            .then(res => {
                update(model => ({
                    ...model,
                    currentModal: null
                }));
                return res;
            })
            .catch(console.log);
    }
    return {
        buttonView(model) {
            return (
                <button onClick={() => toggleModal(modalProps.title)} >
                    <h5 className="channel-link" >CREATE</h5>
                </button>
            );
        },
        modalView(model) {
            return (
                <Modal
                    current={model.currentModal}
                    organisation_id={model.organisation.id}
                    {...modalProps}
                />
            );
        }
    };
}
