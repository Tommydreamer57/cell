
export function getId() {
    return Number(window.location.href.replace(/.*\/(\d*)/, '$1'));
}

export function getMatch() {
    return window.location.href.replace(/.*\/(.+)\/\d*/, '$1');
}
