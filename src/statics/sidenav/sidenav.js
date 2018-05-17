import React from 'react';
import { link } from '../../meiosis-router';
import { SideNav } from '../../styles/components';
import { getId } from '../../routes/url-parser';
import Dropdown from './Dropdown';

export default function create(update) {
    return {
        view(model) {
            let { organisation: org } = model;
            let { channels } = org;
            let currentId = getId();
            return (
                <SideNav id="sidenav" >
                    <Dropdown model={model} update={update} />
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
