import ReactDOM from 'react-dom';
import meiosis, { initialize } from './meiosis';
import createApp from './app';
import { watch } from './meiosis/middlewares';

setTimeout(() => console.log("INITIAL LOAD IS DONE, TIMEOUT HAS FIRED"), 0);

// ROOT
let $root = document.getElementById('root');

// RENDER
// STREAM
// let render = app => model => ReactDOM.render(app.view(model), $root);
// CUSTOM
let render = view => ReactDOM.render(view, $root);

// MEIOSIS
meiosis(
    createApp,
    render,
    watch()
);



// import ReactDOM from 'react-dom';
// import meiosis from './meiosis';
// import createApp from './app';
// import { watch } from './meiosis/middlewares';

// let $root = document.getElementById("root");

// function render(view) {
//     ReactDOM.render(view, $root);
// }

// meiosis(createApp, render, watch());
