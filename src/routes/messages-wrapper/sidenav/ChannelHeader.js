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
        console.log(this.state);
        let {
            toggleCreate,
            toggleJoin,
            joinChannel,
            createChannel,
            stopPropagation,
            state: { currentModal },
            props: {
                channels,
            }
        } = this;
        return (
            <div id="channel-header" onClick={stopPropagation} >
                <h4>Channels</h4>
                <div className='channel-button-wrapper' >
                    <button onClick={toggleCreate} >Create</button>
                    <button onClick={toggleJoin} >Join</button>
                </div>
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
