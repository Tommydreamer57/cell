import React from 'react';
import wrapper from '../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../styles/presets';

export default function create(update) {
    return {
        view(model) {
            let {
                organization,
                router: { match, location }
            } = model;
            let header;
            if (location.pathname.match(/channel/)) {
                let channel = organization.channels
                    .find(({ id }) => id == match.params.id) || {};
                header = channel.name;
            } else if (location.pathname.match(/organization/)) {
                header = organization.name;
            }
            return (
                <Header style={{ width: `calc(100vw - 48px - ${model.sideWidth})` }} >
                    <h3>{header}</h3>
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
        width: 'calc(100% - 48px)',
        padding: '16px 24px',
        background: p.acolor(0.125),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${p.acolor(0.25)}`
    }
});

const Header = wrapper('header', styles.header);
