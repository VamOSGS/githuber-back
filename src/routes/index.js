const combine = require('koa-combine-routers');
const root = require('./root');
const auth = require('./auth');

const routes = combine([root, auth]);

module.exports = routes;
