import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';
import initialModel from './model';
import watchUrl from './meiosis-router';
import watchUpdates from './meiosis/watch-updates';
import countRenders from './meiosis/count-renders';

setTimeout(() => console.log("INITIAL LOAD IS DONE, TIMEOUT HAS FIRED"), 0);

// ROOT
let $root = document.getElementById('root');

// RENDER
let render = view => ReactDOM.render(view, $root);

// MEIOSIS
meiosis(
    createApp,
    initialModel,
    render,
    watchUrl,
    // ignore the 'count' property on the model
    watchUpdates('count'),
    countRenders,
);
