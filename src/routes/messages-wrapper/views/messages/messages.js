import React from 'react';
// UTILS
import initialModel from '../../../../model';
import { getId, getMatch } from '../../../url-parser';
import { GET, POST, PUT, DELETE, UTILS } from '../../../../http';
import { convertDate } from '../../../date-parser';
// COMPONENTS
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import Divider from './Message/Divider';
// STYLES
import wrapper from '../../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../../styles/presets';

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
            if (!model.organization.id) {
                GET.organizationByChannel(update, getId()).then(scrollToBottom).catch(scrollToBottom);
            } else scrollToBottom();
            UTILS.requireAuthentication(update);
        },
        view(model) {
            // AFTER RERENDER, SCROLL TO BOTTOM;
            setTimeout(scrollToBottom);
            let currentId = getId();
            let channel = model.organization.channels.find(channel => channel.id == currentId);
            let {
                user,
                organization: org
            } = model;
            return (
                <Messages id="messages" >
                    {channel && channel.messages && channel.messages
                        .reduce((arr, message, i) => {
                            let previousMessage = channel.messages[i - 1] || {};
                            let previousDate = convertDate(previousMessage.timestamp);
                            let currentDate = convertDate(message.timestamp);
                            if (previousDate.getDate() !== currentDate.getDate()) {
                                arr.push({
                                    isNotMessage: true,
                                    date: currentDate
                                });
                            }
                            arr.push(message);
                            return arr;
                        }, [])
                        .map(message => (
                            message.isNotMessage ?
                                <Divider key={message.date} date={message.date} />
                                :
                                <Message
                                    key={message.id}
                                    message={message}
                                    author={org.members.find(({ id }) => id === message.author_id)}
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
                padding: 0,
                transition: '0.1s',
                display: 'flex',
                borderRadius: 6,
                '& button': {
                    margin: 0,
                    padding: 5,
                    flexGrow: '1',
                    width: 40,
                    borderRadius: 0,
                    borderTop: `1px solid ${p.acolor(0.25)}`,
                    borderBottom: `1px solid ${p.acolor(0.25)}`,
                    '&:first-of-type': {
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        borderLeft: `1px solid ${p.acolor(0.25)}`,
                        borderRight: `1px solid ${p.acolor(0.25)}`
                    },
                    '&:last-of-type': {
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                        borderRight: `1px solid ${p.acolor(0.25)}`,
                        borderLeft: `1px solid ${p.acolor(0.25)}`
                    },
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
                border: `3px solid ${p.acolor(0.25)}`,
                borderRadius: 8,
                '& button': {
                    fontSize: 36,
                    color: '#CCC',
                    height: 50,
                    width: 50,
                    borderRight: `3px solid ${p.acolor(0.25)}`,
                },
                '& input': {
                    padding: 12,
                    width: 'calc(100% - 18px)',
                    fontSize: 18,
                }
            }
        },
        '& .divider': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
});

const Messages = wrapper('div', styles.messages);
