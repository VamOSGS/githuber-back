const Router = require('koa-router');
const passport = require('../utlis/passport');
/* eslint-disable-next-line global-require */
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { FRONT_URL } = process.env;
const auth = new Router();

auth.get('/auth', passport.authenticate('github'));

auth.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/login' }), (ctx) => {
  ctx.redirect(FRONT_URL);
});

auth.get('/profile', (ctx) => {
  ctx.body = ctx.req.user || {
    message: 'Logged out',
  };
});
auth.get('/auth/logout', async (ctx) => {
  await ctx.logOut();
  ctx.body = {
    message: 'Logged out',
  };
  ctx.redirect(FRONT_URL);
});

module.exports = auth;
