import React, { Component } from 'react';
import { GET } from '../../http';
import { link } from '../../meiosis-router';

class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        let { model, update } = this.props;
        return (
            <div className="header" >
                <button onClick={this.toggle} >
                    <h3>{model.organisation.name} v</h3>
                </button>
                {this.state.open && model.allOrganisations.filter(({ id }) => id !== model.organisation.id).map(org => link(model, `/organisations/${org.id}`,
                    <button key={org.id} onClick={this.toggle} >
                        <h4>{org.name}</h4>
                    </button>
                ))}
            </div>
        );
    }
}

export default Dropdown;
