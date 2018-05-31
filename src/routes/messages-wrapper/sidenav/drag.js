import React from 'react';

export default function create(update) {
    let dragging = false;
    const onMouseDown = () => dragging = true;
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('mousemove', event => {
        if (!dragging) return;
        event.preventDefault();
        let sideWidth = event.pageX + 5;
        let max = window.innerWidth / 2;
        let min = window.innerWidth / 5;
        if (sideWidth > max) sideWidth = max;
        if (sideWidth < min) sideWidth = min;
        sideWidth = (sideWidth / window.innerWidth * 100).toFixed(2) + 'vw';
        update(model => (sideWidth !== model.sideWidth) && {
            ...model,
            sideWidth
        });
    });
    return {
        view(model) {
            return (
                <div id="sidenav-drag" onMouseDown={onMouseDown} >
                    <div id="sidenav-drag-button" />
                </div>
            );
        }
    };
}
