const combine = require('koa-combine-routers');
const root = require('./root');

const routes = combine([root]);

module.exports = routes;
