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
            <button onClick={this.joinOrganization} id={this.props.id} tabIndex={this.props.tabIndex} className='organization-button' >
                {this.props.organization.name}
                <div>
                    JOIN
                </div>
            </button>
        );
    }
}

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            selectedIndex: -1
        };
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount() {
        window.addEventListener('click', this.resetSelectedIndex);
        window.addEventListener('keydown', this.incrementSelectedIndex);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.resetSelectedIndex);
        window.removeEventListener('keydown', this.incrementSelectedIndex);
        
    }
    resetSelectedIndex = () => this.setState({ selectedIndex: -1 })
    incrementSelectedIndex = () => {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 })
    }
    handleInput({ target: { value } }) {
        this.setState({
            search: value && new RegExp(value, 'i')
        });
    }
    render() {
        let {
            handleInput,
            props: { organizations: orgs, join: joinOrganization },
            state: { selectedIndex }
        } = this;
        return (
            <div className="search">
                <h2>Find an Organization</h2>
                <input tabIndex={0} placeholder="enter an organization name..." onChange={handleInput} />
                <div className="organization-button-wrapper" >
                    {orgs
                        .filter(org => this.state.search && org.name.match(this.state.search))
                        .map((org, i) => (
                            <OrganizationButton id={org.name} selected={selectedIndex === i} key={org.id} organization={org} joinOrganization={joinOrganization} />
                        ))}
                </div>
            </div>
        );
    }
}
