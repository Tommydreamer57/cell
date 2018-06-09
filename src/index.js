import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';
import watchUpdates from './meiosis/watch-updates';
import watchUrl from './meiosis-router';

setTimeout(() => console.log("INITIAL LOAD IS DONE, TIMEOUT HAS FIRED"), 0);

// ROOT
let $root = document.getElementById('root');

// RENDER
let render = view => ReactDOM.render(view, $root);

// MEIOSIS
meiosis(
    createApp,
    render,
    watchUrl,
    watchUpdates,
);
