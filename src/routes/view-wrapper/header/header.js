import React from 'react';
import wrapper from '../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';

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

const styles = StyleSheet.create({
    header: {
        position: 'fixed',
        top: 0,
        display: 'flex',
        left: '20vw',
        width: 'calc(80vw - 48px)',
        padding: '14px 24px',
        background: '#EEE',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

const Header = wrapper('header', styles.header);
