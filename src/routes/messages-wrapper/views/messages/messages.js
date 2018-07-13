import React from 'react';
// UTILS
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
    function scrollToBottom(arg) {
        console.log("DEFINITELY SCROLLING TO BOTTOM");
        let $messages = document.querySelector("#router-view");
        if ($messages) $messages.scrollTop = $messages.scrollHeight;
        return arg;
    }
    function maybeScrollToBottom(arg) {
        console.log("MAYBE SCROLLING TO BOTTOM");
        let $messages = document.querySelector('#router-view');
        if ($messages) {
            if ($messages.scrollHeight - window.innerHeight < $messages.scrollTop + 32) {
                $messages.scrollTop = $messages.scrollHeight;
            }
        }
        return arg;
    }
    // SCROLL TO BOTTOM ON REROUTE
    update(model => ({
        ...model,
        router: {
            ...model.router,
            callback: scrollToBottom
        }
    }))
    // CREATE MESSAGE
    const sendMessage = ({ id, text }) => POST.message(update, { type: 'channel', id, text }, scrollToBottom);
    // EDIT MESSAGE
    const saveEdit = ({ channel_id, message_id, text }) => PUT.message(update, { type: 'channel', message_id, channel_id, text });
    // DELETE MESSAGE
    const _delete = ({ channel_id, message_id }) => DELETE.message(update, { type: 'channel', message_id, channel_id });
    // COMPONENT
    return {
        // TRACK TIMEOUTS
        timeouts: [],
        // DATA
        data(model) {
            scrollToBottom();
            // ALLOW REQUESTS
            this.requestOrganization = true;
            const getOrganization = cb => (
                this.requestOrganization &&
                this.timeouts.push(setTimeout(getOrganization, 5000)) &&
                GET.organizationByChannel(update, model.router.match.params.id, cb || maybeScrollToBottom)
            );
            // for scroll to bottom on initial page load
            getOrganization(scrollToBottom);
        },
        // CLEAR
        clear(model) {
            this.requestOrganization = false;
            while (this.timeouts.length) clearTimeout(this.timeouts.pop());
        },
        // VIEW
        view(model) {
            // DESTRUCTURE
            let {
                user,
                organization
            } = model;
            // CURRENT CHANNEL
            let channel = organization.channels
                .find(channel => channel.id == model.router.match.params.id)
                ||
                { messages: [] };
            // ADD DIVIDERS BETWEEN DAYS AND FOR NEW MESSAGES
            let groupedMessages = channel.messages
                // .slice()
                // .sort((a, b) => a.id > b.id)
                .reduce((arr, message, i) => {

                    let previousMessage = channel.messages[i - 1] || {};

                    let renderAuthor = !arr.length || previousMessage.author_id !== message.author_id;
                    // console.log("ITERATING THROUGH CHANNEL MESSAGES");
                    // console.log(renderAuthor);

                    if (message.timestamp) {
                        // ADD NEW MESSAGES DIVIDER (for notifications)
                        let lastViewDate = convertDate(channel.previous_last_visited);
                        if (previousDate < lastViewDate && currentDate > lastViewDate) {
                            // console.log("pushing NEW MESSAGE DIVIDER to array: " + renderAuthor);
                            arr.push({
                                isNotMessage: true,
                                isNewMessageDivider: true,
                                date: lastViewDate
                            });
                            // console.log(arr[arr.length - 1]);
                            renderAuthor = true;
                        }
                        // ONLY ADD DAY DIVIDER BETWEEN ACTUAL MESSAGES (not loading messages)
                        let previousDate = convertDate(previousMessage.timestamp);
                        let currentDate = convertDate(message.timestamp);
                        if (previousDate.getDate() !== currentDate.getDate()) {
                            // console.log("pushing DATE DIVIDER to array: " + renderAuthor);
                            arr.push({
                                isNotMessage: true,
                                date: currentDate
                            });
                            // console.log(arr[arr.length - 1]);
                            renderAuthor = true;
                        }
                    }
                    if (!renderAuthor) {
                        arr.slice().reverse().find(m => m.renderAuthor).hasMultiple = true;
                    }
                    // ADD MESSAGE TO ARRAY
                    // console.log("pushing MESSAGE to array: " + renderAuthor);
                    arr.push({
                        ...message,
                        renderAuthor,
                    });
                    // console.log(arr[arr.length - 1]);
                    // RETURN ARRAY
                    return arr;
                }, []);
            // console.log(groupedMessages);
            // RENDER
            return (
                <Messages id="messages" >
                    {groupedMessages
                        .map(message => (
                            // !console.log(message) &&
                            message.isNotMessage ?
                                message.isNewMessageDivider ?
                                    <Divider
                                        key={'new message divider'}
                                        isNewMessageDivider={true}
                                    />
                                    :
                                    <Divider
                                        key={'date divider ' + message.date}
                                        date={message.date}
                                    />
                                :
                                message.isLoading ?
                                    <Message
                                        key={'loading message ' + message.timestamp}
                                        message={message}
                                        loading={true}
                                        author={organization.members.find(({ id }) => id === message.author_id)}
                                    />
                                    :
                                    <Message
                                        key={'message ' + message.id}
                                        channel={channel}
                                        message={message}
                                        author={organization.members.find(({ id }) => id === message.author_id)}
                                        own={user.id === message.author_id}
                                        saveEdit={saveEdit}
                                        _delete={_delete}
                                    />
                        ))}
                    <MessageInput
                        channel={channel}
                        sendMessage={sendMessage}
                        style={{ left: `calc(${model.sideWidth} + 24px)` }}
                    />
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
        minHeight: 'calc(100% - 48px)',
        zIndex: 1,
        '& .message': {
            position: 'relative',
            display: 'flex',
            padding: '8px 28px',
            paddingLeft: 83,
            '&.has-multiple': {
                paddingBottom: 4,
            },
            '&.no-author': {
                paddingTop: 4,
                paddingBottom: 4,
                '&:last-of-type': {
                    paddingBottom: 8
                }
            },
            '&.editing': {
                background: 'rgba(255, 235, 95, 0.125)',
                '&:hover': {
                    background: 'rgba(255, 235, 95, 0.125)',
                },
                '& .button-wrapper': {
                    '& button': {
                        padding: '4px 8px',
                        margin: 6,
                        borderRadius: 5,
                        '&:first-of-type': {
                            marginLeft: 0,
                            background: p.white(0.875),
                            border: `1px solid ${p.acolor(0.75)}`
                        },
                        '&:last-of-type': {
                            background: p.color3,
                            border: `1px solid ${p.color3}`,
                            color: p.white(0.875)
                        },
                    }
                },
            },
            '& .loading-wrapper': {
                position: 'absolute',
                top: 8,
                left: 28,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                width: 45,
                '&.no-author': {
                    height: 'unset',
                }
            },
            '& .image-wrapper, .no-author-timestamp': {
                position: 'absolute',
                top: 8,
                left: 28,
                height: 45,
                borderRadius: 3,
            },
            '& .image-wrapper': {
                background: 'lightblue',
                width: 45,
                '& img': {
                    width: 45,
                    height: 45,
                    borderRadius: 3,
                }
            },
            '& .no-author-timestamp': {
                opacity: 0,
                left: 14,
            },
            '& h6': {
                lineHeight: '100%',
                fontSize: 14,
                color: 'gray',
                fontWeight: '200'
            },
            '& .message-body': {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                lineHeight: '120%',
                '& pre, blockquote': {
                    margin: '4px 0',
                },
                '& .strikethrough': {
                    textDecoration: 'line-through'
                },
                '& h5': {
                    fontWeight: 'bold'
                },
                '& .message-info': {
                    height: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: -4,
                    marginBottom: 5,
                    '& h5': {
                        lineHeight: '100%',
                        marginRight: 10
                    },
                },
                '& .input-wrapper': {
                    border: `2px solid ${p.acolor(0.25)}`,
                    borderRadius: 4,
                    padding: 8,
                    background: p.white(0.875)
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
                '& .no-author-timestamp': {
                    opacity: 1
                },
                background: p.acolor(0.05)
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
                border: `3px solid ${p.acolor(0.25)}`,
                borderRadius: 8,
                maxHeight: '45%',
                overflow: 'auto',
                position: 'fixed',
                bottom: 28,
                right: 28,
                left: 'calc(20vw + 24px)',
                background: 'white',
                '& button': {
                    fontSize: 36,
                    color: '#CCC',
                    height: 50,
                    width: 50,
                    borderRight: `3px solid ${p.acolor(0.25)}`,
                },
                '& input, textarea, div': {
                    padding: 12,
                    width: 'calc(100% - 18px)',
                    fontSize: 18,
                }
            },
            '& mark': {
                position: 'absolute',
                fontSize: 14,
                bottom: 7,
                right: 30,
                background: 'none',
                opacity: 0.65,
                '& code, span, b, em': {
                    marginLeft: 8
                }
            }
        },
        '& .divider': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            transform: 'translateY(-50%)',
            '& h6': {
                background: '#F3F3F5',
                padding: '6px 12px',
                borderRadius: 24,
                transform: 'translateY(50%)',
            },
            '&.notification': {
                color: 'red',
                '& .divider-line': {
                    borderBottom: '1px solid rgba(255, 0, 0, 0.25)',
                    width: '100%'
                }
            },
            '& .divider-line': {
                borderBottom: `1px solid ${p.acolor(0.25)}`,
                width: '100%'
            }
        }
    }
});

const Messages = wrapper('div', styles.messages);
