import React from 'react';
import { Link } from '../../meiosis-router';
import { SideNav } from '../../styles/components';
import { getId, getMatch } from '../../routes/url-parser';
import { POST } from '../../http';
import createDrag from './drag';
import createOrgHeader from './organisation-header';
import createChanHeader from './channel-header/channel-header';

export default function create(update) {

    // CHILDREN
    let drag = createDrag(update);
    let orgHeader = createOrgHeader(update);
    let chanHeader = createChanHeader(update);
    // COMPONENT
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            let currentId = getId();
            let match = getMatch();
            return (
                <SideNav id="sidenav" style={{ width: model.sideWidth }} >
                    {/* DROPDOWN HEADER */}
                    {orgHeader.view(model)}
                    {/* CHANNEL DROPDOWN */}
                    {chanHeader.view(model)}

                    {/* CHANNEL LIST */}
                    {channels.filter(channel => channel.members.some(id => id === model.user.id)).map(channel => (
                        <Link to={`/messages/channel/${channel.id}`} >
                            <div className={`channel-link ${match === 'channel' && channel.id === currentId ? 'selected' : ''}`} >
                                {channel.private ? '$' : '#'} {channel.name}
                            </div>
                        </Link>
                    ))}
                    {/* DRAGGABLE SIDE */}
                    {drag.view(model)}
                </SideNav>
            );
        }
    };
}
