import React from 'react';
import { link } from '../../meiosis-router';
import { SideNav } from '../../styles/components';

export default function create(update) {
    function getId() {
        return window.location.href.replace(/.*\/(.{1,})/, '$1');
    }
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            let currentId = getId();
            return (
                <SideNav id="sidenav" >
                    <h3>{org.name}</h3>
                    {channels.map(channel => link(model, `/messages/channel/${channel.id}`,
                        <div className={`channel-link ${channel.id === currentId ? 'selected' : ''}`} >
                            {channel.private ? '$' : '#'} {channel.name}
                        </div>
                    ))}
                </SideNav>
            );
        }
    };
}
