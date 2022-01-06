import Cookies from 'js-cookie';

// to be able to wrap all fetch requests with csrf
export async function csrfFetch(url, options = {}) {
    // set options.method to GET if it is not set
    // set options.headers to {} if it is not set
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    // for all request methods that are not GET
    // set the XSRF-TOKEN on the header in the options object
    // to the extracted value of the XSRF-TOKEN cookie
    // and set header to 'application/json'
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    // call the default window's fetch with the url and options passed in
    const res = await window.fetch(url, options);

    // if the response status code is 400 or above
    // throw throw an error with the error as the response
    if (res.status >= 400) throw res;

    // otherwise, return the response
    return res;
}

// to get the XSRF-TOKEN cookie during development
// this calls the csrfFetch function with the given url parameter
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
