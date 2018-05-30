import React from 'react';
import { link } from '../../meiosis-router';
import { GET, POST } from '../../http';
import CreateOrJoin from './CreateOrJoin';
import wrapper from '../../styles/components';
import { StyleSheet } from 'aphrodite-jss';

export default function create(update) {
    function joinOrganisation(id) {
        POST.joinOrganisation(update, id);
    }
    function createOrganisation(name) {
        POST.createOrganisation(update, name);
    }
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
                    <div>
                        <h3>Your Organisations</h3>
                        {orgs
                            .filter(org => user.organisations.includes(org.id))
                            .map(org => (
                                <h3>
                                    {org.name}
                                    {link(model, `/organisation/${org.id}`, "Launch")}
                                </h3>
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
        '& #create-or-join': {
            '& .current': {

            },
            '& .out': {
                display: 'none'
            }
        }
    }
});

const Dashboard = wrapper('div', styles.dashboard);
