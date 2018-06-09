import _link, { Link as _Link } from './Link';
// import Router, { Link as _Link } from './context';
import _watchUrl from './middleware';
import _createRoute, { createMultiple as _createMultiple } from './route';
import _createSwitch from './switch.js';
import listen from './listen';

export const Link = _Link;
export const link = _link;
export const watchUrl = _watchUrl;
export const createRoute = _createRoute;
export const createMultiple = _createMultiple;
export const createSwitch = _createSwitch;

// export default Router;
export default listen;
