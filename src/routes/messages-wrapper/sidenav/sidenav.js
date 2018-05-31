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

export default function create(update) {

    function createChannel(name, _private) {
        update(({ organisation: { id } }) => {
            POST.newChannel(update, id, name, _private);
        });
    }

    function joinChannel(id) {
        POST.joinChannel(update, id);
    }

    // CHILDREN
    let drag = createDrag(update);
    let orgHeader = createOrgHeader(update);
    // let chanHeader = createChanHeader(update);
    // COMPONENT
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            let currentId = getId();
            let match = getMatch();
            let joinedChannels = channels.filter(({ id }) => model.user.channels.includes(id));
            let notJoinedChannels = channels.filter(({ id }) => !model.user.channels.includes(id));
            return (
                <SideNav id="sidenav" style={{ width: model.sideWidth }} >
                    {/* DROPDOWN HEADER */}
                    {orgHeader.view(model)}
                    {/* CHANNEL DROPDOWN */}
                    {/* {chanHeader.view(model)} */}
                    <ChannelHeader channels={notJoinedChannels} create={createChannel} join={joinChannel} />
                    {/* CHANNEL LIST */}
                    {joinedChannels.map(channel => link(model, `/messages/channel/${channel.id}`,
                        <div className={`channel-link ${match === 'channel' && channel.id === currentId ? 'selected' : ''}`} >
                            {channel.private ? '$' : '#'} {channel.name}
                        </div>
                    ))}
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
