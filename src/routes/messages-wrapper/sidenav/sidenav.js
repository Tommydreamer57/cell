import React from 'react';
import { link } from '../../../meiosis-router';
import { getId, getMatch } from '../../url-parser';
import { POST } from '../../../http';
import createDrag from './drag';
import createOrgHeader from './organisation-header';
// import createChanHeader from './channel-header/channel-header';
import ChannelHeader from './ChannelHeader';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../../styles/components';
import p from '../../../styles/presets';

export default function create(update) {

    function createChannel(name, _private) {
        let request;
        update(({ organisation: { id } }) => {
            request = POST.newChannel(update, id, name, _private);
        });
        return request;
    }

    const joinChannel = id => POST.joinChannel(update, id);

    // CHILDREN
    let drag = createDrag(update);
    let orgHeader = createOrgHeader(update);
    // let chanHeader = createChanHeader(update);
    // COMPONENT
    return {
        view(model) {
            let { organisation: org, sideWidth, user } = model;
            let { channels } = org;
            let currentId = getId();
            let match = getMatch();
            let joinedChannels = channels.filter(({ members }) => members.includes(user.id));
            let notJoinedChannels = channels.filter(({ members }) => !members.includes(user.id));
            return (
                <SideNav id="sidenav" style={{ width: sideWidth }} >
                    {/* DROPDOWN HEADER */}
                    {orgHeader.view(model)}
                    {/* CHANNEL DROPDOWN */}
                    <ChannelHeader channels={notJoinedChannels} create={createChannel} join={joinChannel} />
                    {/* CHANNEL LIST */}
                    <div className="channel-list" >
                        {joinedChannels.map(channel => link(model, `/messages/channel/${channel.id}`,
                            <div className={`channel-link ${match === 'channel' && channel.id === currentId ? 'selected' : ''}`} >
                                {channel.private ? '$' : '#'} {channel.name}
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
        background: '#DDD',
        left: 0,
        bottom: 0,
        minWidth: '20vw',
        overflowY: 'auto',
        overflowX: '',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        resize: 'horizontal',
        '& .dropdown': {
            width: '100%'
        },
        '& .header': {
            width: '100%',
            background: '#CCC',
            '& button': {
                width: '100%',
                padding: '14px 18px',
            },
            '&:hover': {
                background: '#BBB'
            }
        },
        '& .channel-button-wrapper': {
            display: 'flex',
            justifyContent: 'space-between'
        },
        '& .selected': {
            fontWeight: 'bold',
        },
        '& .channel-list': {
            '& a, & button': {
                width: '100%',
                fontSize: 18,
                '& .channel-link, & .channel-header': {
                    width: 'calc(100% - 36px)',
                    padding: '6px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover': {
                        background: '#BBB'
                    }
                }
            },
        },
        '& .modal': {
            position: 'fixed',
            top: '10rem',
            width: '40vw',
            background: 'white', // p.acolor(0.1),
            border: '1px solid',
            padding: 24,
            borderRadius: 12,
            transition: '0.6s',
            left: '50%',
            '&.current': {
                transform: 'translateX(-50%)'
            },
            '&.out': {
                transform: 'translateX(120vw)'
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
            '& .channel-button': {
                border: `1px solid ${p.acolor(0.25)}`,
                paddingLeft: 12,
                margin: '6px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 4,
                '& button': {
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
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 2,
                height: 24,
                width: 4
            }
        }
    }
});

const SideNav = wrapper('nav', styles.sidenav);
