import React from 'react';
import { GET, POST } from '../../http';
import initialModel from '../../model';
import { css } from 'aphrodite-jss';
import styles from '../../styles/styles';
import { Messages } from '../../styles/components';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';

export default function create(update) {
    // CHANNEL ID
    function getId() {
        return window.location.href.replace(/.*\/(.{1,})/, '$1');
    }
    // EVENT HANDLERS
    function onKeyDown({ target, key }) {
        if (key === 'Enter' && target.value.trim()) {
            POST.message(update, 'channel', getId(), target.value);
            target.value = '';
        }
    }
    // COMPONENT
    return {
        data() {
            // GET.channel(update, getId()).then(() => {
                let $messages = document.querySelector("#router-view");
                $messages.scrollTop = $messages.scrollHeight;
            // });
        },
        view(model) {
            let currentId = getId();
            let channel = model.organisation.channels.find(channel => channel.id == currentId);
            return (
                <Messages id="messages" >
                    {channel && channel.messages && channel.messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                    <MessageInput onKeyDown={onKeyDown} />
                </Messages>
            );
        }
    };
}
