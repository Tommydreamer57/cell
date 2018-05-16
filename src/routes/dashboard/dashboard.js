import React from 'react';
import { Link, link } from '../../meiosis-router';
import http from '../../http';

export default function create(update) {
    // COMPONENT
    return {
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
