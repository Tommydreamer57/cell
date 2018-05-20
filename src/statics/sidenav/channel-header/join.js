import React from 'react';
import { POST } from '../../../http';
import Modal from '../../../components/Modal/Modal';

export default function create(update) {
    // MODAL
    const modalProps = {
        title: 'Join A Channel',
        subtitle: '',
        toggle: toggleModal,
        inputs: []
    };
    // FUNCTIONS
    function toggleModal() {
        update(model => ({
            ...model,
            currentModal: typeof arguments[0] === 'string' ? arguments[0] : null,
        }));
    }
    return {
        buttonView(model) {
            return (
                <button onClick={() => toggleModal(modalProps.title)} >
                    <h5 className="channel-link" >JOIN</h5>
                </button>
            );
        },
        modalView(model) {
            return (
                <Modal
                    current={model.currentModal}
                    organisation_id={model.organisation.id}
                    {...modalProps}
                    inputs={model.organisation.channels
                        .reduce((inputs, { id, name, members }) => {
                            if (!members.includes(model.user.id)) {
                                inputs.push({
                                    name,
                                    id,
                                    type: 'link',
                                    to: `/messages/channel/${id}`,
                                    model,
                                });
                            }
                            return inputs;
                        }, [])}
                />
            );
        }
    };
}
