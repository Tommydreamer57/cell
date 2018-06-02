import React, { Component } from 'react';
import CreateChannel from './modals/CreateChannel';
import JoinChannel from './modals/JoinChannel';

export default class ChannelHeader extends Component {
    constructor() {
        super();
        this.state = {
            currentModal: null
        };
        this.toggleCreate = () => this.setState({ currentModal: 'create' });
        this.toggleJoin = () => this.setState({ currentModal: 'join' });
        this.toggleOff = () => this.setState({ currentModal: null });
    }
    componentDidMount() {
        window.addEventListener('click', this.toggleOff);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.toggleOff);
    }
    stopPropagation(e) {
        e.stopPropagation();
    }
    createChannel = (...args) => {
        this.props.create(...args)
            .then(res => {
                this.toggleOff();
                return res;
            });
    }
    joinChannel = (...args) => {
        this.props.join(...args)
            .then(res => {
                this.toggleOff();
                return res;
            });
    }
    render() {
        let {
            toggleCreate,
            toggleJoin,
            toggleOff,
            joinChannel,
            createChannel,
            stopPropagation,
            state: { currentModal },
            props: { channels }
        } = this;
        return (
            <div id="channel-header" onClick={stopPropagation} >
                <h4>Channels</h4>
                <div className='channel-button-wrapper' >
                    <button onClick={toggleCreate} >Create</button>
                    <button onClick={toggleJoin} >Join</button>
                </div>
                <div className={`background-filter ${currentModal ? 'on' : 'off'}`} onClick={toggleOff} />
                <div className='modal-wrapper' >
                    <div className={`modal ${currentModal === 'create' ? 'current' : 'out'}`} >
                        <CreateChannel create={createChannel} />
                    </div>
                    <div className={`modal ${currentModal === 'join' ? 'current' : 'out'}`} >
                        <JoinChannel join={joinChannel} channels={channels} />
                    </div>
                </div>
            </div>
        );
    }
}
