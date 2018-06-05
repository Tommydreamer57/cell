import React, { Component } from 'react';
// COMPONENTS
import Search from './Search';
import Create from './Create';
import { Carat } from '../../../../styles/logo';

export default class CreateOrJoin extends Component {
    constructor() {
        super();
        this.state = {
            currentModal: null
        };
    }
    componentDidMount() {
        window.addEventListener('click', this.toggleOff);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.toggleOff);
    }
    toggleJoin = e => {
        e.stopPropagation();
        this.setState({ currentModal: 'join' });
    }
    toggleCreate = e => {
        e.stopPropagation();
        this.setState({ currentModal: 'create' });
    }
    toggleOff = e => {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        this.setState({ currentModal: null });
    }
    stopPropagation(e) {
        e.stopPropagation();
    }
    joinOrganisation = (...args) => {
        this.props.join(...args)
            .then(this.toggleOff);
    }
    render() {
        let {
            toggleJoin,
            toggleCreate,
            toggleOff,
            stopPropagation,
            joinOrganisation,
            state: { currentModal },
            props: { organisations: orgs,
                create: createOrganisation
            }
        } = this;
        return (
            <div id="create-or-join">
                <div className='button-wrapper' >
                    <button onClick={toggleJoin} ><h6>Join an Organisation</h6><Carat /></button>
                    <button onClick={toggleCreate} ><h6>Create an Organisation</h6><Carat /></button>
                </div>
                <div onClick={stopPropagation} className='modal-wrapper'>
                    {/* JOIN */}
                    <div className={`modal ${currentModal === 'join' ? 'current' : 'out'}`} >
                        <Search organisations={orgs} join={joinOrganisation} />
                    </div>
                    {/* CREATE */}
                    <div className={`modal ${currentModal === 'create' ? 'current' : 'out'}`} >
                        <Create create={createOrganisation} />
                    </div>
                </div>
            </div>
        );
    }
}
