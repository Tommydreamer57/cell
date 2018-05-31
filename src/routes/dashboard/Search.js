import React, { Component } from 'react';

class OrganisationButton extends Component {
    constructor() {
        super();
        this.joinOrganisation = this.joinOrganisation.bind(this);
    }
    joinOrganisation() {
        return this.props.joinOrganisation(this.props.organisation.id);
    }
    render() {
        return (
            <div className='organisation-button' >
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
            search: value && new RegExp(value, 'i')
        });
    }
    render() {
        let {
            handleInput,
            props: { organisations: orgs, join: joinOrganisation }
        } = this;
        return (
            <div className="search">
                <h3>Find an Organisation</h3>
                <input placeholder="enter an organisation name..." onChange={handleInput} />
                <div className="organisation-button-wrapper" >
                    {orgs
                        .filter(org => this.state.search && org.name.match(this.state.search))
                        .map(org => (
                            <OrganisationButton key={org.id} organisation={org} joinOrganisation={joinOrganisation} >{org.name}</OrganisationButton>
                        ))}
                </div>
            </div>
        );
    }
}
