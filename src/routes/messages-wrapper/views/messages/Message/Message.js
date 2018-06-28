import React, { Component } from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import MessageHover from './MessageHover';
import { toTime } from '../../../../date-parser';
import { Loading } from '../../../../../styles/logo';
import Text from './Text';

export default class Message extends Component {

    constructor(props) {
        super(props);
        if (props.own) {
            this.state = {
                editing: false,
                value: Plain.deserialize(props.message.text)
            };
            this.toggleEdit = () => this.setState({ editing: !this.state.editing });
        } else this.state = {};
    }

    onChange = ({ value }) => this.setState({ value })

    onKeyDown = (event, change) => {
        const { key, ctrlKey } = event;
        if (key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            if (ctrlKey) {
                change.insertBlock({ type: 'paragraph' });
            } else if (Plain.serialize(this.state.value).trim()) {
                this.props.saveEdit({
                    channel_id: this.props.channel.id,
                    message_id: this.props.message.id,
                    text: Plain.serialize(this.state.value)
                });
                this.cancel();
            }
            return true;
        }
    }

    saveEdit = e => this.onKeyDown(Object.assign(e, { key: "Enter" }));

    renderNode = ({ attributes, children }) => <p {...attributes} >{children}</p>

    cancel = () => {
        this.setState({
            editing: false,
            value: Plain.deserialize(this.props.message.text)
        });
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
            onChange,
            renderNode,
            cancel,
            _delete,
            onKeyDown,
            saveEdit,
            props: { loading, message: { renderAuthor, hasMultiple, ...message }, author, own },
            state: { editing, value }
        } = this;
        // console.log(message, renderAuthor)
        return (
            <div className={`message ${renderAuthor === false ? 'no-author' : ''} ${hasMultiple === true ? 'has-multiple' : ''} ${editing ? 'editing' : ''}`} >
                {loading ?
                    renderAuthor === false ?
                        <div className="loading-wrapper no-author" >
                            <Loading size={12} />
                        </div>
                        :
                        <div className="loading-wrapper" >
                            <Loading />
                        </div>
                    :
                    renderAuthor === false ?
                        <h6 className="no-author-timestamp" >
                            {toTime(message.timestamp)}
                        </h6>
                        :
                        <div className="image-wrapper" >
                            <img src={author.img || "https://londonspeakerbureau.com/wp-content/uploads/1970/01/103c8ee903d35a1e7db510d660358dca-wpcf_300x300.png"} />
                        </div>}
                <div className="message-body" >
                    {renderAuthor !== false &&
                        <span className="message-info">
                            <h5>{author.first_name} {author.last_name}</h5>
                            <h6>
                                {toTime(message.timestamp)}
                            </h6>
                        </span>}
                    {editing ?
                        <div className="input-wrapper" >
                            <Editor
                                value={value}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                renderNode={renderNode}
                            />
                        </div>
                        :
                        <Text text={message.text} />}
                    {editing &&
                        <div className="button-wrapper" >
                            <button onClick={cancel} >Cancel</button>
                            <button onClick={saveEdit} >Save</button>
                        </div>}
                </div>
                <MessageHover message={message} toggleEdit={toggleEdit} _delete={_delete} own={own} />
            </div>
        );
    }
}
