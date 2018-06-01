import React from 'react';
import { GET, POST, PUT, DELETE } from '../../http';
import initialModel from '../../model';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import { getId, getMatch } from '../url-parser';
import wrapper from '../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../styles/presets';

export default function create(update) {
    // FUNCTIONS
    function scrollToBottom() {
        let $messages = document.querySelector("#router-view");
        if ($messages) $messages.scrollTop = $messages.scrollHeight;
    }
    // CREATE MESSAGE
    const sendMessage = text => POST.message(update, 'channel', getId(), text);
    // EDIT MESSAGE
    const saveEdit = (id, text) => PUT.message(update, 'channel', id, text, getId());
    // DELETE MESSAGE
    const _delete = id => DELETE.message(update, 'channel', id, getId());
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
            let {
                user,
                organisation: org
            } = model;
            return (
                <Messages id="messages" >
                    {channel && channel.messages && channel.messages.map(message => (
                        <Message
                            key={message.id}
                            message={message}
                            author={org.members.find(({id}) => id === message.author_id)}
                            own={user.id === message.author_id}
                            saveEdit={saveEdit}
                            _delete={_delete}
                        />
                    ))}
                    <MessageInput sendMessage={sendMessage} style={{ left: model.sideWidth, width: `calc(100vw - ${model.sideWidth})` }} />
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
            position: 'relative',
            display: 'flex',
            padding: 8,
            '& .message-body': {
                display: 'flex',
                flexDirection: 'column',
                '& h5': {
                    fontWeight: 'bold'
                }
            },
            '& .message-hover': {
                position: 'absolute',
                top: 0,
                right: 0,
                opacity: 0,
                border: `1px solid ${p.acolor(0.25)}`,
                padding: '3px 6px',
                borderRadius: 6,
                transition: '0.1s',
                '& button': {
                    margin: '0 3px'
                }
            },
            '&:hover': {
                '& .message-hover': {
                    opacity: 1
                }
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
