export function getPathName() {
    return window.location.pathname.replace(/^\//, '');
}

export function getUrlName() {
    return (getPathName().match(/\/([^\/]*).html$/) || [])[1] || null;
}

export function getFullUrl(pathname: string) {
    return new URL(pathname, window.location.origin).href;
}
