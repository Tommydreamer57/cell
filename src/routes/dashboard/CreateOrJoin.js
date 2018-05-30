import React, { Component } from 'react';
import Search from './Search';
import Create from './Create';

export default class CreateOrJoin extends Component {
    constructor() {
        super();
        this.state = {
            currentModal: null
        };
        this.toggleJoin = () => this.setState({ currentModal: 'join' });
        this.toggleCreate = () => this.setState({ currentModal: 'create' });
        this.toggleOff = () => this.setState({ currentModal: null });
    }
    render() {
        let {
            toggleJoin,
            toggleCreate,
            toggleOff,
            state: { currentModal },
            props: { organisations: orgs,
                join: joinOrganisation,
                create: createOrganisation
            }
        } = this;
        return (
            <div id="create-or-join">
                <div>
                    <button onClick={toggleJoin} >Join an Organisation</button>
                    <button onClick={toggleCreate} >Create an Organisation</button>
                </div>
                {/* JOIN */}
                <div className={`modal ${currentModal === 'join' ? 'current' : 'out'}`} >
                    <Search organisations={orgs} join={joinOrganisation} />
                </div>
                {/* CREATE */}
                <div className={`modal ${currentModal === 'create' ? 'current' : 'out'}`} >
                    <Create create={createOrganisation} />
                </div>
            </div>
        );
    }
}
