
function getProxyURL() {
    const defaultProxy = 'http://www.zhouyc.cc';
    const defaultPort = 8000;

    let proxyUrl = process.env.API_PROXY || defaultProxy;
    proxyUrl = proxyUrl.replace('127.0.0.1', 'localhost');

    if (!proxyUrl.startsWith('http')) {
        proxyUrl = `http://${proxyUrl}`;
    }
    if (proxyUrl.includes('localhost') && !proxyUrl.includes(':')) {
        proxyUrl = `${proxyUrl}:${defaultPort}`;
    }
    return proxyUrl;
}

module.exports = {
    API_PROXY: getProxyURL(),
};
