import React from 'react';
// UTILS
import { link } from '../../../../meiosis-router';
import { GET } from '../../../../http';
// CHILDREN
import { Loading } from '../../../../styles/logo';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../../../styles/components';
import p from '../../../../styles/presets';

export default function create(update) {
    // COMPONENT
    return {
        // TRACK TIMEOUTS
        timeouts: [],
        // DATA
        data(model) {
            // ALLOW REQUESTS
            this.requestOrganization = true;
            const getOrganization = () => (
                this.requestOrganization &&
                this.timeouts.push(setTimeout(getOrganization, 5000)) &&
                GET.organization(update, model.router.match.params.id)
            );
            getOrganization();
        },
        // CLEAR
        clear(model) {
            this.requestOrganization = false;
            while (this.timeouts.length) clearTimeout(this.timeouts.pop());
        },
        view(model) {
            let { organization: { members } } = model;
            return (
                <Organization>
                    <h2>Members</h2>
                    {members.length ?
                        members.map(member => (
                            <div className='member' key={member.username} >
                                <h5>{member.first_name} {member.last_name}</h5>
                                <h5>@{member.username}</h5>
                            </div>
                        ))
                        :
                        <div className="loading-wrapper" >
                            <Loading size={50} />
                        </div>
                    }
                </Organization>
            );
        }
    };
}

const styles = StyleSheet.create({
    organization: {
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
        },
        '& .loading-wrapper': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 36
        }
    }
});

const Organization = wrapper('section', styles.organization);
