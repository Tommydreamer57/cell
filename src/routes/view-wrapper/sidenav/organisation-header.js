import React from 'react';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { link } from '../../../meiosis-router';

export default function create(update) {
    return {
        view(model) {
            return (
                <Dropdown
                    className="header"
                    type="header"
                    title={model.organisation.name}
                >
                    {model.allOrganisations.filter(({ id }) => id !== model.organisation.id).map(org => link(model, `/organisations/${org.id}`,
                        <button key={org.id} >
                            <h4>{org.name}</h4>
                        </button>
                    ))}
                </Dropdown>
            );
        }
    }
}
