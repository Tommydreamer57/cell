import React from 'react';
import wrapper from '../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../styles/presets';

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
                <Header style={{ left: model.sideWidth, width: `calc(100vw - 48px - ${model.sideWidth})` }} >
                    <h3>{header}&nbsp;</h3>
                    <input placeholder="search" />
                </Header>
            );
        }
    };
}

const styles = StyleSheet.create({
    header: {
        position: 'fixed',
        top: 0,
        display: 'flex',
        left: '20vw',
        width: 'calc(80vw - 48px)',
        padding: '16px 24px',
        background: p.acolor(0.125),
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

const Header = wrapper('header', styles.header);
