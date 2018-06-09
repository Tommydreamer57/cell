import React from 'react';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { link } from '../../../../meiosis-router';

export default function create(update) {
    return {
        view(model) {
            let {
                allOrganizations,
                organization,
                user
            } = model;
            return (
                <Dropdown
                    className="header"
                    type="header"
                    title={organization.name}
                >
                    {allOrganizations
                        .filter(({ id }) => id !== organization.id && user.organizations.includes(id))
                        .map(org => link(model, `/organizations/${org.id}`,
                            <h4>{org.name}</h4>
                        ))}
                    {link(model, '/dashboard', <h4>Dashboard</h4>)}
                </Dropdown>
            );
        }
    }
}
