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
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '100%',
        zIndex: 1,
        '& .message': {
            position: 'relative',
            display: 'flex',
            padding: '8px 24px',
            '& .image-wrapper': {
                height: 45,
                width: 45,
                borderRadius: 3,
                marginRight: 10,
                background: 'lightblue'
            },
            '& .message-body': {
                display: 'flex',
                flexDirection: 'column',
                '& h5': {
                    fontWeight: 'bold'
                },
                '& .message-info': {
                    height: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                    '& h5': {
                        marginRight: 10
                    },
                    '& h6': {
                        fontSize: 14,
                        color: 'gray',
                        fontWeight: '200'
                    }

                }
            },
            '& .message-hover': {
                position: 'absolute',
                top: -5,
                right: 25,
                opacity: 0,
                border: `1px solid ${p.acolor(0.25)}`,
                padding: 0,
                borderRadius: 6,
                transition: '0.1s',
                display: 'flex',
                '& button': {
                    margin: 0,
                    padding: 5,
                    flexGrow: '1',
                    width: 40
                },
                '& .hover-icon': {
                    color: 'gray',
                    fontSize: 15
                }
            },
            '&:hover': {
                '& .message-hover': {
                    opacity: 1,
                    background: 'white'
                },
                background: '#f3f3f3'
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
