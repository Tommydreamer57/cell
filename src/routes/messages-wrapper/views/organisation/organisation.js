import React from 'react';
// UTILS
import { link } from '../../../../meiosis-router';
import { GET, POST } from '../../../../http';
import { getId, getMatch } from '../../../url-parser';
import defaultModel from '../../../../model';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../../../styles/components';
import p from '../../../../styles/presets';

export default function create(update) {
    // ORGANISATION ID

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
                <Organisation>
                    <h2>Members</h2>
                    {org.members.map(member => (
                        <div className='member' key={member.username} >
                            <h5>{member.first_name} {member.last_name}</h5>
                            <h5>@{member.username}</h5>
                        </div>
                    ))}
                </Organisation>
            );
        }
    };
}

const styles = StyleSheet.create({
    organisation: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem',
        '& h2': {
            marginBottom: 24
        },
        '& .member': {
            margin: '4px 0',
            padding: '6px 10px',
            border: `1px solid ${p.color}`,
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%'
        }
    }
});

const Organisation = wrapper('section', styles.organisation);
