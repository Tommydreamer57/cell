import React from 'react';
import createSidenav from './sidenav/sidenav';
import createTopnav from './topnav/topnav';

export default function create(update) {
    // CHILDREN
    let sidenav = createSidenav(update);
    let topnav = createTopnav(update);
    // COMPONENT
    return {
        view(model) {
            return (
                <div id="statics-view" >
                    {topnav.view(model)}
                    {sidenav.view(model)}
                </div>
            );
        }
    };
}
