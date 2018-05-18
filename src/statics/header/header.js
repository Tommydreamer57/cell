import React from 'react';
import { Header } from '../../styles/components';

export default function create(update) {
    function getId() {
        return window.location.href.replace(/.*\/(.{1,})/, '$1');
    }
    return {
        view(model) {
            let { pathname } = window.location;
            let header;
            let currentId = getId();
            if (pathname.match(/messages/)) {
                if (pathname.match(/channel/)) {
                    let channel = model.organisation.channels.find(channel => channel.id == currentId) || {};
                    header = channel.name;
                    if (channel.private) header += ' (private)';
                    if (channel.id != currentId) header = '';
                }
                // else header = model.group.name;
            } else if (pathname.match(/organisation/)) {
                if (model.organisation.id != currentId) header = ' ';
                else header = model.organisation.name;
            }
            return (
                <Header style={{ left: model.sideWidth }} >
                    <h2>{header}&nbsp;</h2>
                    <input placeholder="search" />
                </Header>
            );
        }
    };
}
