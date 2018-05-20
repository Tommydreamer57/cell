import React from 'react';
import { link } from '../../meiosis-router';
import { GET } from '../../http';

export default function create(update) {
    // COMPONENT
    return {
        data(model) {
            GET.allOrganisations(update);
        },
        view(model) {
            let { allOrganisations: orgs } = model;
            return (
                <div>
                    {orgs.map(org => link(model, `/organisation/${org.id}`, org.name))}
                </div>
            );
        }
    };
}
