import React from 'react';
import { GET, POST } from '../../http';
import initialModel from '../../model';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import { getId, getMatch } from '../url-parser';
import wrapper from '../../styles/components';
import { StyleSheet } from 'aphrodite-jss';

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
                    <MessageInput onKeyDown={onKeyDown} style={{ left: model.sideWidth, width: `calc(100vw - ${model.sideWidth})` }} />
                </Messages>
            );
        }
    };
}

const centerFlex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const styles = StyleSheet.create({
    messages: {
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '100%',
        zIndex: 1,
        '& .message': {
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            '& div': {
                display: 'flex',
                flexDirection: 'column'
            },
            '& span': {
                display: 'flex'
            }
        },
        '& .message-input': {
            ...centerFlex,
            position: 'fixed',
            bottom: 0,
            left: '20vw',
            right: 0,
            width: '80vw',
            height: 96,
            paddingBottom: 8,
            '& .input-wrapper': {
                ...centerFlex,
                width: 'calc(100% - 56px)',
                border: '3px solid #DDD',
                borderRadius: 8,
                '& button': {
                    fontSize: 36,
                    color: '#CCC',
                    height: 50,
                    width: 50,
                    borderRight: '3px solid #DDD',
                },
                '& input': {
                    padding: 12,
                    width: 'calc(100% - 18px)',
                    fontSize: 18,
                }
            }
        }
    }
});

const Messages = wrapper('div', styles.messages);
