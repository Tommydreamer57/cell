import React, { Component, createRef } from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';

export default class MessageInput extends Component {
    constructor() {
        super();
        this.initialValue = Plain.deserialize(' ');
        this.state = {
            value: this.initialValue
        };
        this.inputWrapper = createRef();
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
                this.props.sendMessage({
                    id: this.props.channel.id,
                    text: Plain.serialize(this.state.value)
                });
                change.selectAll().delete();
            }
            return true;
        }
    }

    renderNode = ({ attributes, children }) => <p {...attributes} >{children}</p>

    render() {
        let {
            onChange,
            onKeyDown,
            renderNode,
            inputWrapper,
            state: { value },
            props: { sendMessage, style, ...props },
        } = this;
        return (
            <div className="message-input" {...props} >
                <div ref={inputWrapper} className="input-wrapper" style={style} >
                    <button className="plus-button">+</button>
                    <Editor
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        renderNode={renderNode}
                        autoFocus={true}
                    />
                </div>
                <mark>
                    <b>*bold*</b>
                    <em>_italic_</em>
                    <span>~strikethrough~</span>
                    <code>`code`</code>
                    <code>```prereformatted```</code>
                    <span>>quote</span>
                </mark>
            </div>
        );
    }
}
