import React from 'react';
// UTILS
import { link } from '../../../../meiosis-router';
import { GET, POST, UTILS } from '../../../../http';
// COMPONENTS
import CreateOrJoin from './CreateOrJoin';
// STYLES
import wrapper from '../../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../../styles/presets';

export default function create(update) {
    const joinOrganization = id => POST.joinOrganization(update, id);
    const createOrganization = name => POST.createOrganization(update, name);
    // COMPONENT
    return {
        data(model) {
            GET.allOrganizations(update);
            UTILS.requireAuthentication(update);
        },
        view(model) {
            // DESTRUCTURING
            let { allOrganizations: orgs, user } = model;
            return (
                <Dashboard id="dashboard" >

                    {/* OrganizationS TO JOIN */}
                    <CreateOrJoin
                        organizations={orgs.filter(org => !user.organizations.includes(org.id))}
                        join={joinOrganization}
                        create={createOrganization}
                    />
                    {/* OrganizationS ALREADY JOINED */}
                    <div className='joined-organization-list' >
                        <h5>Your Organizations:</h5>
                        {orgs
                            .filter(org => user.organizations.includes(org.id))
                            .map(org => link(model, `/organization/${org.id}`,
                                <div className='joined-organization' >
                                    <h3>{org.name}</h3>
                                    <span>Launch</span>
                                </div>
                            ))}
                    </div>
                </Dashboard>
            );
        }
    };
}

const styles = StyleSheet.create({
    dashboard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '10rem',
        '& #create-or-join': {
            display: 'flex',
            flexDirection: 'column',
            display: 'flex',
            width: '35vw',
            '& .button-wrapper': {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                '& button': {
                    width: '100%',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${p.acolor(0.125)}`,
                    '&:nth-of-type(1)': {
                        borderTop: `1px solid ${p.acolor(0.125)}`
                    },
                    '& .carat': {
                        transition: '0.2s'
                    },
                    '&:hover .carat': {
                        transform: 'rotate(-90deg) translateY(6px)'
                    }
                }
            },
            '& .modal': {
                position: 'fixed',
                top: '10rem',
                width: '40vw',
                background: 'white', // p.acolor(0.1),
                border: '1px solid',
                padding: 24,
                borderRadius: 12,
                transition: '0.6s',
                left: '50%',
                '&.current': {
                    transform: 'translateX(-50%)'
                },
                '&.out': {
                    transform: 'translateX(120vw)'
                },
                '& input': {
                    marginTop: 18,
                    width: 'calc(100% - 12px)',
                    padding: 6,
                    border: `1px solid ${p.acolor(0.25)}`,
                    borderRadius: 4,
                    outline: 'none',
                    '&:focus': {
                        border: '1px solid rgb(109, 159, 243)'
                    }
                },
                '& .organization-button': {
                    border: `1px solid ${p.acolor(0.25)}`,
                    paddingLeft: 12,
                    margin: '6px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 4,
                    '& button': {
                        padding: 6,
                        paddingRight: 12,
                        borderLeft: `1px solid ${p.acolor(0.25)}`
                    },
                    '&:nth-of-type(1)': {
                        marginTop: 24
                    }
                }
            }
        },
        '& .joined-organization-list': {
            margin: '24px 0',
            width: '35vw',
            '& h5': {
                margin: '16px 0'
            },
            '& a': {
                ...p.reset,
                '& .joined-organization': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: `1px solid ${p.acolor(0.125)}`,
                    borderRadius: 5,
                    padding: '6px 10px',
                    margin: '6px 0',
                    '& span': {
                        border: `1px solid ${p.acolor(0.125)}`,
                        borderRadius: 5,
                        padding: '4px 8px',
                        transition: '0.2s'
                    },
                    '&:hover span': {
                        padding: '4px 10px',
                        background: 'white'
                    }
                }
            }
        }
    }
});

const Dashboard = wrapper('div', styles.dashboard);
