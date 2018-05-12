const Koa = require('koa');
const session = require('koa-session');
const passport = require('koa-passport');

const routes = require('./routes');

const app = new Koa();

/* eslint-disable-next-line global-require */
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { PORT, HOST, SECRET } = process.env;
app.keys = [SECRET];

app
  .use(session({}, app))
  .use(passport.initialize())
  .use(passport.session())
  .use(routes);

app.use((ctx, next) => {
  if (ctx.status === 404) {
    ctx.body = { success: false, message: 'Not found' };
  }
  next();
});

app.listen(PORT, () => {
  console.log(`started in http://${HOST}:${PORT}`);
});
