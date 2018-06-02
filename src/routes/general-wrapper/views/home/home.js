import React from 'react';
// UTILS
import { link } from '../../../../meiosis-router';
// STYLES
import wrapper from '../../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../../styles/presets';

// let jellyfish = "https://images.unsplash.com/photo-1488953994029-e6a7ba3348f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dd1fb5c29ccc0c74948741cda53f0455&auto=format&fit=crop&w=600&q=60";

export default function create(update) {
    // COMPONENT
    return {
        view(model) {
            return (
                <Home id="home" >
                    <div className="img" />
                    {/* <img src="" /> */}
                    <div className="text-wrapper" >
                        <h1>Where Work Happens</h1>
                        <p>When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Slack has you covered.</p>
                        {link(model, '/signup', <h4>Sign Up</h4>)}
                    </div>
                </Home>
            );
        }
    };
}

const styles = StyleSheet.create({
    home: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8rem 6rem 4rem',
        '& .img': {
            width: '35%',
            height: 'fill',
            background: p.acolor(0.2)
        },
        '& .text-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 'calc(60% - 8rem)',
            marginLeft: '4rem',
            marginRight: '2rem',
            '& h1': {
                fontSize: '4rem'
            },
            '& p': {
                margin: '2rem 0',
                fontSize: '1.25rem',
                lineHeight: '120%',
            },
            '& a': {
                ...p.primaryBtn
            }
        }
    }
});

const Home = wrapper('div', styles.home);
