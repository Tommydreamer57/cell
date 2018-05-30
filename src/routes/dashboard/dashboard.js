import React from 'react';
import { link } from '../../meiosis-router';
import { GET, POST } from '../../http';
import CreateOrJoin from './CreateOrJoin';

export default function create(update) {
    function joinOrganisation(id) {
        POST.joinOrganisation(update, id);
    }
    // COMPONENT
    return {
        data(model) {
            GET.allOrganisations(update);
        },
        view(model) {
            // DESTRUCTURING
            let { allOrganisations: orgs, user } = model;
            console.log(model);
            return (
                <div id="dashboard" >

                    {/* ORGANISATIONS TO JOIN */}
                    <CreateOrJoin
                        organisations={orgs.filter(org => !user.organisations.includes(org.id))}
                        join={joinOrganisation}
                    />
                    {/* ORGANISATIONS ALREADY JOINED */}
                    <div>
                        <h3>Your Organisations</h3>
                        {orgs
                            .filter(org => user.organisations.includes(org.id))
                            .map(org => link(model, `/organisation/${org.id}`, org.name))}
                    </div>
                </div>
            );
        }
    };
}
