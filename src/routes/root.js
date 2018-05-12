const Router = require('koa-router');

const root = new Router();

root.get('/', async (ctx) => {
  ctx.body = ctx.req.user ? '<h1>LOGGED IN</h1>' : '<h1>NOT LOGGED IN</h1>';
});

module.exports = root;
