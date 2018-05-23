import React from 'react';
import { Link } from '../../meiosis-router';
import { GET } from '../../http';

export default function create(update) {
    // COMPONENT
    return {
        data(model) {
            GET.allOrganisations(update);
        },
        view(model) {
            let { allOrganisations: orgs } = model;
            console.log(model);
            return (
                <div>
                    {orgs.map(org => <Link to={`/organisation/${org.id}`} >{org.name}</Link>)}
                </div>
            );
        }
    };
}
