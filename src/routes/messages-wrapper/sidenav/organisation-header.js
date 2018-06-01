import React from 'react';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { link } from '../../../meiosis-router';

export default function create(update) {
    return {
        view(model) {
            let {
                allOrganisations,
                organisation,
                user
            } = model;
            return (
                <Dropdown
                    className="header"
                    type="header"
                    title={organisation.name}
                >
                    {allOrganisations
                        .filter(({ id }) => id !== organisation.id && user.organisations.includes(id))
                        .map(org => link(model, `/organisations/${org.id}`,
                            <h4>{org.name}</h4>
                        ))}
                    {link(model, '/dashboard', <h4>Dashboard</h4>)}
                </Dropdown>
            );
        }
    }
}
