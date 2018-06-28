import React from 'react';
// UTILS
import { link } from '../../../meiosis-router';
import { POST } from '../../../http';
// COMPONENTS
import createDrag from './drag';
import createOrganizationHeader from './headers/organization-header';
import ChannelHeader from './headers/ChannelHeader';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../../styles/components';
import p from '../../../styles/presets';

export default function create(update) {

    function createChannel(name, _private) {
        let request;
        update(({ organization: { id } }) => {
            request = POST.newChannel(update, id, name, _private);
        });
        return request;
    }

    const joinChannel = id => POST.joinChannel(update, id);

    // CHILDREN
    let drag = createDrag(update);
    let organizationHeader = createOrganizationHeader(update);

    // COMPONENT
    return {
        view(model) {
            let {
                sideWidth,
                user,
                router: { match: { params: { id, type } } },
                organization: { channels },
            } = model;
            let joinedChannels = channels
                .filter(({ members }) => members.includes(user.id))
                .map(channel => ({
                    ...channel,
                    unreadMessages: channel.messages
                        .filter(message => (
                            new Date(message.timestamp) > new Date(channel.last_visited)
                            &&
                            !message.isLoading
                            &&
                            message.author_id != model.user.id
                        )).length
                }));
            let notJoinedChannels = channels.filter(({ members }) => !members.includes(user.id));
            return (
                <SideNav id="sidenav" style={{ width: sideWidth }} >
                    {/* DROPDOWN HEADER */}
                    {organizationHeader.view(model)}
                    {/* CHANNEL DROPDOWN */}
                    <ChannelHeader channels={notJoinedChannels} create={createChannel} join={joinChannel} />
                    {/* CHANNEL LIST */}
                    <div className="channel-list" >
                        {joinedChannels.map(channel => link(model, `/messages/channel/${channel.id}`,
                            <div
                                className={
                                    `channel-link ${
                                    type === 'channel' && channel.id == id ? 'selected' : ''
                                    } ${
                                    channel.unreadMessages ? 'new' : ''
                                    }`
                                }
                            >
                                {channel.private ? '$' : '#'} {channel.name} {channel.unreadMessages ? `(${channel.unreadMessages})` : ''}
                            </div>
                        ))}
                    </div>
                    {/* DRAGGABLE SIDE */}
                    {drag.view(model)}
                </SideNav>
            );
        }
    };
}

const styles = StyleSheet.create({
    sidenav: {
        position: 'fixed',
        top: 0,
        display: 'flex',
        background: p.acolor(0.75),
        left: 0,
        bottom: 0,
        width: '20vw',
        overflowY: 'auto',
        overflowX: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        resize: 'horizontal',
        '& .dropdown-wrapper': {
            width: '100%',
            color: p.white(0.875),
            '& button': {
                textAlign: 'left',
                color: p.white(0.875),
            },
            '& .dropdown-title': {
                position: 'relative',
                zIndex: 2,
                color: p.white(0.875),
                background: '#3A3E65', // p.acolor(0.5),
            },
            '& .dropdown': {
                zIndex: 1,
                position: 'absolute',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                background: '#4B4E71', // p.acolor(0.5),
                transition: '0.2s',
                '&.open': {
                    transform: 'translateY(0)'
                },
                '&.closed': {
                    transform: 'translateY(-150%)'
                },
                '& a': {
                    ...p.reset,
                    padding: '14px 18px',
                    color: p.white(0.875),
                    transition: '0.2s',
                    '&:hover': {
                        background: '#43446A'
                    }
                }
            }
        },
        '& .header': {
            width: '100%',
            color: p.white(0.875),
            background: p.acolor(0.66),
            '& button': {
                width: '100%',
                padding: '14px 18px',
            },
        },
        '& #channel-header': {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            color: p.white(0.875),
            // borderBottom: `1px solid ${p.acolor(0.5)}`,
            '& h4': {
                padding: '12px 18px',
                fontSize: 22,
                // borderBottom: `1px solid ${p.acolor(0.5)}`,
            },
            '& .channel-button-wrapper': {
                display: 'flex',
                justifyContent: 'space-between',
                '& button': {
                    color: p.white(0.5),
                    width: '50%',
                    padding: '6px 18px',
                    fontSize: 16,
                    fontStyle: 'italic',
                    '&:hover': {
                        color: p.white(0.875),
                        background: p.acolor(0.5)
                    }
                }
            }
        },
        '& .channel-list': {
            width: '100%',
            '& a, & button': {
                ...p.reset,
                width: '100%',
                fontSize: 18,
                '& .channel-link, & .channel-header': {
                    width: 'calc(100% - 36px)',
                    padding: '6px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    transition: '0.2s',
                    '&:hover': {
                        background: p.acolor(0.5)
                    },
                    color: p.white(0.5),
                    '&.selected': {
                        background: p.acolor(0.5),
                        color: p.white(0.75)
                    },
                    '&.new': {
                        fontWeight: 'bold',
                        color: p.white(0.875)
                    }
                }
            },
        },
        '& .background-filter': {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: p.acolor(0.25),
            transition: 'opacity 0.2s',
            '&.on': {
                top: 0,
                opacity: 1
            },
            '&.off': {
                top: '100vh',
                opacity: 0
            }
        },
        '& .modal': {
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40vw',
            padding: 24,
            borderRadius: 12,
            transition: '0.6s',
            background: 'white', // p.acolor(0.1),
            border: '1px solid',
            color: p.color,
            '&.current': {
                top: '10rem',
                // '& .background-filter': {
                //     top: 0
                // }
            },
            '&.out': {
                top: 'calc(100vh + 10rem)',
                // '& .background-filter': {
                //     top: '110vh'
                // }
            },
            '& input[type="text"]': {
                marginTop: 18,
                width: 'calc(100% - 12px)',
                padding: 6,
                border: `1px solid ${p.acolor(0.25)}`,
                borderRadius: 4,
                outline: 'none',
                '&:focus': {
                    border: '1px solid rgb(109, 159, 243)'
                }
            },
            '& .create-channel': {
                '& h2': {
                    marginBottom: 12
                },
                '& button': {
                    width: '100%',
                    background: p.acolor2(0.875),
                    color: p.white(1),
                    padding: 8,
                    borderRadius: 4,
                    width: 'calc(100%)',
                    margin: '16px 0 0'
                }
            },
            '& .channel-button': {
                border: `1px solid ${p.acolor(0.25)}`,
                paddingLeft: 12,
                margin: '6px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 4,
                width: '100%',
                '& div': {
                    padding: 6,
                    paddingRight: 12,
                    borderLeft: `1px solid ${p.acolor(0.25)}`
                },
                '&:nth-of-type(1)': {
                    marginTop: 24
                }
            },
            '& .private-button': {
                display: 'flex',
                width: '100%',
                margin: '16px 10px 0',
                '& input': {
                    marginLeft: 16
                }
            }
        },
        '& #sidenav-drag': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '20vh',
            right: 0,
            bottom: '20vh',
            width: 10,
            cursor: 'ew-resize',
            '& div': {
                background: p.white(0.5),
                borderRadius: 2,
                height: 24,
                width: 4
            }
        }
    }
});

const SideNav = wrapper('nav', styles.sidenav);
