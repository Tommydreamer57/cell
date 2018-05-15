import _Link, { link as _link } from './Link';
import _createRoute from './route';
import _createSwitch from './switch.js';
import listen from './listen';

export const Link = _Link;
export const link = _link;
export const createRoute = _createRoute;
export const createSwitch = _createSwitch;

export default listen;
