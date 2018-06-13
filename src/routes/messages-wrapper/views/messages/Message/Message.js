import React, { Component } from 'react';
import MessageHover from './MessageHover';
import { toTime } from '../../../../date-parser';
import { Loading } from '../../../../../styles/logo';

export default class Message extends Component {
    constructor(props) {
        super(props);
        if (props.own) {
            this.state = {
                editing: false,
                input: props.message.text
            };
            this.toggleEdit = () => this.setState({ editing: !this.state.editing });
        } else this.state = {};
    }
    cancel = () => {
        this.setState({
            editing: false,
            input: this.props.message.text
        });
    }
    onKeyDown = ({ key }) => {
        if (key === 'Enter') {
            this.props.saveEdit({
                channel_id: this.props.channel.id,
                message_id: this.props.message.id,
                text: this.state.input
            })
                .then(this.cancel);
        }
    }
    handleInput = ({ target: { value } }) => {
        this.setState({ input: value });
    }
    _delete = () => {
        this.props._delete({
            channel_id: this.props.channel.id,
            message_id: this.props.message.id
        });
    }
    render() {
        let {
            toggleEdit,
            handleInput,
            cancel,
            _delete,
            onKeyDown,
            props: { loading, message, author, saveEdit, own },
            state: { editing, input }
        } = this;
        return (
            <div className="message" >
                {loading ?
                    <div className="loading-wrapper" >
                        <Loading />
                    </div>
                    :
                    <div className="image-wrapper" >
                        <img src={author.img} />
                    </div>}
                <div className="message-body" >
                    <span className="message-info">
                        <h5>{author.first_name} {author.last_name}</h5>
                        <h6>
                            {toTime(message.timestamp)}
                        </h6>
                    </span>
                    {editing ?
                        <input value={input} onChange={handleInput} onKeyDown={onKeyDown} />
                        :
                        <span>{message.text}</span>}
                    {editing && <button onClick={cancel} >Cancel</button>}
                    {editing && <button onClick={saveEdit} >Save</button>}
                </div>
                <MessageHover message={message} toggleEdit={toggleEdit} _delete={_delete} own={own} />
            </div>
        );
    }
}
