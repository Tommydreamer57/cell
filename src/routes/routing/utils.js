
// FIND CORRECT ROUTE
function match(pathname, routes) {
    if (!routes || !routes.length) return '';
    let pathArr = pathname.split('/');
    return routes.find(route => {
        let routeArr = route.split('/');
        return (
            routeArr.length === pathArr.length
            &&
            routeArr.reduce((pass, str, i) => pass && (
                str[0] === ':'
                ||
                pathArr[i] === str
            ), true)
        );
    });
}

// CREATE MATCH OBJECT
function parse(pathname, route) {
    if (!route || !route.length) return {};
    if (match(pathname, [route]) !== route) throw new Error('can only parse legitimate route match');
    return route.split('/')
        .filter(str => str[0] === ':')
        .reverse()
        .reduce((params, param, i) => ({
            ...params,
            [param.slice(1)]: pathname.split('/').reverse()[i]
        }), {});
}

// FIND CORRECT ROUTE AND CREATE MATCH OBJECT
function matchAndParse(pathname, routes) {
    let route = match(pathname, routes);
    let params = parse(pathname, route);
    return {
        match: route,
        params
    };
}

export function registerRoute(update, route) {
    console.log("REGISTERING ROUTE: " + route);
    setTimeout(() => {
        update(model => ({
            ...model,
            router: {
                ...model.router,
                routes: [route, ...model.router.routes]
            }
        }));
    }, 0);
}

export default function listen(update) {
    function onHashChange() {
        let { protocol, hostname, port, pathname, host, origin, href } = window.location;
        update(model => {
            let { routes } = model.router;
            let { match, params } = matchAndParse(pathname, routes);
            return {
                ...model,
                router: {
                    routes,
                    match,
                    params,
                    location: { protocol, hostname, port, pathname, host, origin, href }
                }
            };
        });
    }
    window.onHashChange = onHashChange;
    // RUN FUNCTION INITIALLY ASYNCHRONOUSLY TO WAIT FOR APP TO FINISH LOADING
    setTimeout(onHashChange, 0);
}
