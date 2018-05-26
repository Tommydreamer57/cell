import React from 'react';
import createSidenav from './sidenav/sidenav';
import createHeader from './header/header';

export default function create(update) {
    // CHILDREN
    // sidenav = createRoute(['/messages/*', '/organisation/*', '/channels/*'], createSidenav, update)
    let sidenav = createSidenav(update);
    let header = createHeader(update);
    // COMPONENT
    return {
        view(model) {
            return (
                <div id="statics-view" >
                    {header.view(model)}
                    {sidenav.view(model)}
                </div>
            );
        }
    };
}
