import React from 'react';
// ROUTING
import { createSwitch } from '../../meiosis-router';
// COMPONENTS
import createHeader from './header/header';
// VIEWS
import createHome from './views/home/home';
import createDashboard from './views/dashboard/dashboard';
import createSignup from './views/login/signup';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../styles/components';
import p from '../../styles/presets';

export default function createGeneralWrapper(update) {

    let header = createHeader(update);

    let switchh = createSwitch(update,
        ['/', createHome, update, true],
        ['/dashboard', createDashboard, update],
        ['/login', createSignup, update],
        ['/signup', createSignup, update],
    );

    return {
        view(model) {
            let matched = switchh.view(model);
            return matched && (
                <GeneralWrapper>
                    {matched}
                    {header.view(model)}
                </GeneralWrapper>
            );
        }
    }
}

const styles = StyleSheet.create({
    generalwrapper: {
        '& header': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: 18,
            borderBottom: `1px solid ${p.acolor(.5)}`,
            background: 'white',
            '& #logo-wrapper': {
                display: 'flex',
                '& h3': {
                    margin: '0 12px'
                }
            },
            '& a': {
                ...p.reset
            },
            '& a:nth-of-type(2)': {
                ...p.reset,
                border: `1px solid ${p.color}`,
                borderRadius: 5,
                padding: '5px 10px',
                transition: '0.15s',
                '&:hover': {
                    border: `1px solid ${p.acolor(0.75)}`,
                    color: p.acolor(0.75)
                }
            }
        }
    }
});

const GeneralWrapper = wrapper('div', styles.generalwrapper);
