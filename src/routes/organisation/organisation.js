import React from 'react';
import { Link } from '../../meiosis-router';
import { GET, POST } from '../../http';
import defaultModel from '../../model';
import { getId, getMatch } from '../url-parser';

export default function create(update) {
    // ORGANISATION ID

    // COMPONENT
    return {
        data() {
            return GET.organisation(update, getId());
        },
        view(model) {
            let { organisation: org } = model;
            if (getId() != org.id) {
                org = defaultModel.organisation;
            }
            return (
                <section>
                    <header>
                        <h1>{org.name}</h1>
                    </header>
                    <div>
                        <h2>Channels</h2>
                        {org.channels.map(channel => (
                            <Link key={channel.id} to={`/messages/channel/${channel.id}`} >
                                <h3>{channel.name}</h3>
                            </Link>
                        ))}
                        <h2>Members</h2>
                        {org.members.map(member => (
                            <div key={member.username} >{member.username}</div>
                        ))}
                    </div>
                </section>
            );
        }
    };
}
