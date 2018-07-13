import ReactDOM from 'react-dom';
// import meiosis from './meiosis';
import mitosis from './mitosisjs';
import createApp from './app';
import initialModel from './model';
import watchUrl from './mitosis-router';
import { watchUpdates, countRenders, freeze } from './meiosis-middlewares';

// ROOT
let $root = document.getElementById('root');

// MEIOSIS
// meiosis(
mitosis(
    createApp,
    initialModel,
    (view, cb) => ReactDOM.render(view, $root, cb),
    // MIDDLEWARES
    watchUrl,
    // watchUpdates('count'),
    countRenders,
    freeze
);
