import React from 'react';
// import Link from 'react-router-dom';
import { Link, link } from '../../meiosis-router';
import http from '../../http/http';

export default function create(update) {
    // INITIAL DATA
    let org_id = window.location.href.replace(/.*\//, '');
    http.getOrganisation(update, org_id);
    // CHILDREN
    // COMPONENT
    return {
        view(model) {
            return (
                <section>
                    <header>
                        <h1>{model.organisation.name}</h1>
                    </header>
                    <div>
                        <h2>Channels</h2>
                        {model.organisation.channels.map(channel => link(model, `/messages/channel/${channel.id}`,
                            <h3>{channel.name}</h3>
                        ))}
                        <h2>Members</h2>
                        {model.organisation.members.map(member => (
                            <div>{member.username}</div>
                        ))}
                    </div>
                </section>
            );
        }
    };
}
