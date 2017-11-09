
const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://vn.zhaopengfeix.top/api/' : 'api/'
}