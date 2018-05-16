import React from 'react';
import { link } from '../../meiosis-router';
import { SideNav } from '../../styles/components';

export default function create(update) {
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            return (
                <SideNav id="sidenav" >
                    <h1>{org.name}</h1>
                    {channels.map(channel => link(model, `/messages/channel/${channel.id}`,
                        <div key={channel.name} >{channel.private ? 'P' : '#'} {channel.name}</div>
                    ))}
                </SideNav>
            );
        }
    }
}
