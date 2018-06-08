import React, { Component } from 'react';

class ChannelButton extends Component {
    constructor() {
        super();
        this.joinChannel = this.joinChannel.bind(this);
    }
    joinChannel() {
        return this.props.joinChannel(this.props.channel.id);
    }
    render() {
        return (
            <div className='channel-button' >
                {this.props.channel.name}
                <button onClick={this.joinChannel} >
                    JOIN
                </button>
            </div>
        );
    }
}

export default class JoinChannel extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }
    handleInput = ({ target: { value } }) => {
        this.setState({
            search: value && new RegExp(value, 'i')
        });
    }
    render() {
        let {
            handleInput,
            state: { search },
            props: { join: joinChannel, channels }
        } = this;
        console.log(channels);
        return (
            <div className='modal-modal' >
                <h3>Find a Channel</h3>
                <input type="text" placeholder="enter an organization name..." onChange={handleInput} />
                <div className="organization-button-wrapper" >
                    {channels
                        .filter(channel => search && channel.name.match(search))
                        .map(channel => (
                            <ChannelButton key={channel.id} channel={channel} joinChannel={joinChannel} />
                        ))}
                </div>
            </div>
        );
    }
}
