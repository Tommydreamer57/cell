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
        window.addEventListener('keydown', this.handleEscape);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.toggleOff);
        window.addEventListener('keydown', this.handleEscape);
    }
    handleEscape = ({ key }) => key === 'Escape' && this.toggleOff()
    toggleJoin = e => {
        document.querySelector('#create-or-join .search input').focus();
        e.stopPropagation();
        this.setState({ currentModal: 'join' });
    }
    toggleCreate = e => {
        document.querySelector('#create-or-join .create input').focus();
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
    joinOrganization = (...args) => {
        this.props.join(...args)
            .then(this.toggleOff);
    }
    render() {
        let {
            toggleJoin,
            toggleCreate,
            stopPropagation,
            joinOrganization,
            state: { currentModal },
            props: { organizations: orgs,
                create: createOrganization
            }
        } = this;
        return (
            <div id="create-or-join">
                <div className='button-wrapper' >
                    <button onClick={toggleJoin} ><h6>Join an Organization</h6><Carat /></button>
                    <button onClick={toggleCreate} ><h6>Create an Organization</h6><Carat /></button>
                </div>
                <div className={`modal-background ${currentModal ? "in" : ''}`} />
                <div onClick={stopPropagation} className='modal-wrapper'>
                    {/* JOIN */}
                    <div className={`modal ${currentModal === 'join' ? 'current' : 'out'}`} >
                        <Search organizations={orgs} join={joinOrganization} />
                    </div>
                    {/* CREATE */}
                    <div className={`modal ${currentModal === 'create' ? 'current' : 'out'}`} >
                        <Create create={createOrganization} />
                    </div>
                </div>
            </div>
        );
    }
}
