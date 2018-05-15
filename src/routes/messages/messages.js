import React from 'react';
import http from '../../http/http';

export default function create(update) {
    // INITIAL DATA
    let type = window.location.href.replace(/.*\/(.{1,})\/[^/]*$/, '$1');
    let id = window.location.href.replace(/.*\/(.{1,})/, '$1');
    http.getChannel(update, id);
    // CHILDREN
    // COMPONENT
    return {
        view(model) {
            return (
                <div>
                    <header>
                        <h1>{model.channel.name} {model.channel.private ? '(private)' : ''}</h1>
                    </header>
                    <div>
                        <h2>Members</h2>
                        {model.channel.members.map(member => <div>{member.username}</div>)}
                    </div>
                </div>
            );
        }
    };
}
