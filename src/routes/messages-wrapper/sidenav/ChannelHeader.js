import React, { Component } from 'react';
import CreateChannel from './CreateChannel';
import JoinChannel from './JoinChannel';

export default class ChannelHeader extends Component {
    constructor() {
        super();
        this.state = {
            currentModal: null
        };
    }
    toggleCreate = () => {
        this.setState({
            currentModal: 'create'
        });
    }
    toggleJoin = () => {
        this.setState({
            currentModal: 'join'
        });
    }
    toggleOff = () => {
        this.setState({
            currentModal: null
        });
    }
    render() {
        let {
            toggleCreate,
            toggleJoin,
            state: { currentModal },
            props: {
                channels,
                create: createChannel,
                join: joinChannel
            }
        } = this;
        return (
            <div id="channel-header" >
                <h4>Channels</h4>
                <div className='channel-button-wrapper' >
                    <button onClick={toggleCreate} >Create</button>
                    <button onClick={toggleJoin} >Join</button>
                </div>
                <div className='modal-wrapper' >
                    <div className={`modal ${currentModal === 'create' ? 'selected' : ''}`} >
                        <CreateChannel create={createChannel} />
                    </div>
                    <div className={`modal ${currentModal === 'join' ? 'selected' : ''}`} >
                        <JoinChannel join={joinChannel} channels={channels} />
                    </div>
                </div>
            </div>
        );
    }
}
