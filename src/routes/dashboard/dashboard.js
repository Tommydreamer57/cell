import React from 'react';
import { Link } from 'react-router-dom';
import http from '../../http/http';

export default function create(update) {
    // INITIAL DATA
    // CHILDREN
    // METHODS
    function getOrganisation(id) {
        http.getOrganisation(update, id);
    }
    // COMPONENT
    return {
        view(model) {
            return (
                <div>
                    {model.allOrganisations.map(org => (
                        <div>
                            <Link to={`/organisation/${org.id}`} >
                                <button onClick={() => getOrganisation(org.id)} >
                                    {org.name}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            );
        }
    };
}
