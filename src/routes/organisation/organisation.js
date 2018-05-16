import React from 'react';
// import Link from 'react-router-dom';
import { Link, link } from '../../meiosis-router';
import { GET, POST } from '../../http';
import defaultModel from '../../model';

export default function create(update) {
    // ORGANISATION ID
    function getId() {
        return window.location.href.replace(/.*\//, '');
    }
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
                        {org.channels.map(channel => link(model, `/messages/channel/${channel.id}`,
                            <h3>{channel.name}</h3>
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
