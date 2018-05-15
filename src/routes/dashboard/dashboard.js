import React from 'react';
import { Link, link } from '../../meiosis-router';
import http from '../../http/http';

export default function create(update) {
    // METHODS
    function getOrganisation(id) {
        http.getOrganisation(update, id);
    }
    // COMPONENT
    return {
        view(model) {
            let { allOrganisations: orgs } = model;
            return (
                <div>
                    {orgs.map(org => link(model, `/organisation/${org.id}`,
                        <button onClick={() => getOrganisation(org.id)} >
                            {org.name}
                        </button>
                    ))}
                </div>
            );
        }
    };
}
