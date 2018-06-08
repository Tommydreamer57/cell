import React, { Component } from 'react';

class OrganizationButton extends Component {
    constructor() {
        super();
        this.joinOrganization = this.joinOrganization.bind(this);
    }
    joinOrganization() {
        return this.props.joinOrganization(this.props.organization.id);
    }
    render() {
        return (
            <div className='organization-button' >
                {this.props.organization.name}
                <button onClick={this.joinOrganization} >
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
            props: { organizations: orgs, join: joinOrganization }
        } = this;
        return (
            <div className="search">
                <h3>Find an Organization</h3>
                <input placeholder="enter an organization name..." onChange={handleInput} />
                <div className="organization-button-wrapper" >
                    {orgs
                        .filter(org => this.state.search && org.name.match(this.state.search))
                        .map(org => (
                            <OrganizationButton key={org.id} organization={org} joinOrganization={joinOrganization}  />
                        ))}
                </div>
            </div>
        );
    }
}
