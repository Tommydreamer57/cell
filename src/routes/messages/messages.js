import React from 'react';
import { GET, POST } from '../../http';
import initialModel from '../../model';
import { css } from 'aphrodite-jss';
import styles from '../../styles/styles';
import { Messages } from '../../styles/components';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import { getId, getMatch } from '../url-parser';

export default function create(update) {
    // EVENT HANDLERS
    function onKeyDown({ target, key }) {
        if (key === 'Enter' && target.value.trim()) {
            POST.message(update, 'channel', getId(), target.value);
            target.value = '';
        }
    }
    // FUNCTIONS
    function scrollToBottom() {
        let $messages = document.querySelector("#router-view");
        if ($messages) $messages.scrollTop = $messages.scrollHeight;
    }
    // COMPONENT
    return {
        data(model) {
            if (!model.organisation.id) {
                GET.organisationByChannel(update, getId()).then(scrollToBottom).catch(scrollToBottom);
            } else scrollToBottom();
        },
        view(model) {
            // AFTER RERENDER, SCROLL TO BOTTOM;
            setTimeout(scrollToBottom, 0);
            let currentId = getId();
            let channel = model.organisation.channels.find(channel => channel.id == currentId);
            return (
                <Messages id="messages" >
                    {channel && channel.messages && channel.messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                    <MessageInput onKeyDown={onKeyDown} style={{ left: model.sideWidth }} />
                </Messages>
            );
        }
    };
}
