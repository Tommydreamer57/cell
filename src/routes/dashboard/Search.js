import React, { Component } from 'react';

class OrganisationButton extends Component {
    constructor() {
        super();
        this.joinOrganisation = this.joinOrganisation.bind(this);
    }
    joinOrganisation() {
        this.props.joinOrganisation(this.props.organisation.id);
    }
    render() {
        return (
            <div>
                {this.props.organisation.name}
                <button onClick={this.joinOrganisation} >
                    JOIN
                </button>
            </div>
        );
    }
}

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        };
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput({ target: { value } }) {
        this.setState({
            search: new RegExp(value, 'i')
        });
    }
    render() {
        let {
            handleInput,
            props: { organisations: orgs, join: joinOrganisation }
        } = this;
        return (
            <div className="search">
                <input placeholder="search" onChange={handleInput} />
                {orgs
                    .filter(org => org.name.match(this.state.search))
                    .map(org => (
                        <OrganisationButton key={org.id} organisation={org} joinOrganisation={joinOrganisation} >{org.name}</OrganisationButton>
                    ))}
            </div>
        );
    }
}
