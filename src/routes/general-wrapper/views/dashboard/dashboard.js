import React from 'react';
// UTILS
import { link } from '../../../../meiosis-router';
import { GET, POST } from '../../../../http';
// COMPONENTS
import CreateOrJoin from './CreateOrJoin';
// STYLES
import wrapper from '../../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../../styles/presets';

export default function create(update) {
    const joinOrganisation = id => POST.joinOrganisation(update, id);
    const createOrganisation = name => POST.createOrganisation(update, name);
    // COMPONENT
    return {
        data(model) {
            GET.allOrganisations(update);
        },
        view(model) {
            // DESTRUCTURING
            let { allOrganisations: orgs, user } = model;
            return (
                <Dashboard id="dashboard" >

                    {/* ORGANISATIONS TO JOIN */}
                    <CreateOrJoin
                        organisations={orgs.filter(org => !user.organisations.includes(org.id))}
                        join={joinOrganisation}
                        create={createOrganisation}
                    />
                    {/* ORGANISATIONS ALREADY JOINED */}
                    <div className='joined-organisation-list' >
                        <h5>Your Organisations:</h5>
                        {orgs
                            .filter(org => user.organisations.includes(org.id))
                            .map(org => link(model, `/organisation/${org.id}`,
                                <div className='joined-organisation' >
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
                '& .organisation-button': {
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
        '& .joined-organisation-list': {
            margin: '24px 0',
            width: '35vw',
            '& h5': {
                margin: '16px 0'
            },
            '& a': {
                ...p.reset,
                '& .joined-organisation': {
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
