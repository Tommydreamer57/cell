import React from 'react';
import Dropdown from '../../../components/Dropdown';
import { link } from '../../../../meiosis-router';
import { POST } from '../../../../http';

export default function create(update) {
    const logout = e => {
        e.preventDefault();
        return POST.logout(update);
    }
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
                    {link(model, '/dashboard', <h5>Dashboard</h5>)}
                    <a onClick={logout} ><h5>Logout</h5></a>
                </Dropdown>
            );
        }
    }
}
