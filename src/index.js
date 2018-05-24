import ReactDOM from 'react-dom';
import initialize from './meiosis';
import createApp from './app';
import { watch } from './meiosis/middlewares';

// ROOT
let $root = document.getElementById('root');

// RENDER
let render = app => model => ReactDOM.render(app.view(model), $root);

// MEIOSIS
initialize(createApp, render, watch());




// import ReactDOM from 'react-dom';
// import meiosis from './meiosis';
// import createApp from './app';
// import { watch } from './meiosis/middlewares';

// let $root = document.getElementById("root");

// function render(view) {
//     ReactDOM.render(view, $root);
// }

// meiosis(createApp, render, watch());