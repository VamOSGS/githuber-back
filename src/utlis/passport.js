const GitHubStrategy = require('passport-github').Strategy;
const passport = require('koa-passport');
/* eslint-disable-next-line global-require */
if (process.env.NODE_ENV === 'development') require('dotenv').config();

// eslint-disable-next-line object-curly-newline
const { PORT, HOST, NODE_ENV, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.use(new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `http://${HOST}${NODE_ENV === 'development' && `:${PORT}`}/auth/callback`,
  },
  (accessToken, refreshToken, profile, cb) => cb(null, profile),
));
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
