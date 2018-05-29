import React, { Component } from 'react';
import Search from './Search';

export default class CreateOrJoin extends Component {
    constructor() {
        super();
        this.state = {
            currentModal: null
        };
        this.toggleJoin = this.toggleJoin.bind(this);
        this.toggleCreate = this.toggleCreate.bind(this);
        this.toggleOff = this.toggleOff.bind(this);
    }
    toggleJoin() {
        this.setState({
            currentModal: 'join'
        });
    }
    toggleCreate() {
        this.setState({
            currentModal: 'create'
        });
    }
    toggleOff() {
        this.setState({
            currentModal: null
        });
    }
    render() {
        let {
            toggleJoin,
            toggleCreate,
            toggleOff,
            state: { currentModal },
            props: { organisations: orgs, join: joinOrganisation }
        } = this;
        return (
            <div id="create-or-join">
                <div>
                    <button onClick={toggleJoin} >Join an Organisation</button>
                    <button onClick={toggleCreate} >Create an Organisation</button>
                </div>
                <div className={`modal ${currentModal === 'join' ? 'current' : 'out'}`} >
                    <Search organisations={orgs} join={joinOrganisation} />
                </div>
                <div className={`modal ${currentModal === 'create' ? 'current' : 'out'}`} >
                    
                </div>
            </div>
        );
    }
}
