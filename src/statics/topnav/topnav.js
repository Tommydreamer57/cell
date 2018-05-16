import React from 'react';
import { TopNav } from '../../styles/components';

export default function create(update) {
    function getId() {
        let id = window.location.href.replace(/.*\/(.{1,})/, '$1');
        console.log(id);
        return id;
    }
    return {
        view(model) {
            let { pathname } = window.location;
            let header;
            if (pathname && pathname.includes('messages')) {
                if (pathname.includes('channel')) header = model.channel.name;
                if (model.channel.private) header += ' (private)';
                // else header = model.group.name;
            } else if (pathname && pathname.includes('organisation')) {
                header = model.organisation.name;
            }
            if (model.channel.id != getId() && model.organisation.id != getId()) header = '';
            return (
                <TopNav>
                    <h1>{header}</h1>
                    <input placeholder="search" />
                </TopNav>
            );
        }
    };
}
