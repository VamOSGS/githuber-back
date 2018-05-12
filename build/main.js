require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-passport");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Koa = __webpack_require__(5);
const session = __webpack_require__(6);
const passport = __webpack_require__(0);

const routes = __webpack_require__(7);

const app = new Koa();

/* eslint-disable-next-line global-require */
if (true) __webpack_require__(2).config();

const { PORT, HOST, SECRET } = process.env;
app.keys = [SECRET];

app.use(session({}, app)).use(passport.initialize()).use(passport.session()).use(routes);

app.use((ctx, next) => {
  if (ctx.status === 404) {
    ctx.body = { success: false, message: 'Not found' };
  }
  next();
});

app.listen(PORT, () => {
  console.log(`started in http://${HOST}:${PORT}`);
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const combine = __webpack_require__(8);
const root = __webpack_require__(9);
const auth = __webpack_require__(10);

const routes = combine([root, auth]);

module.exports = routes;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-combine-routers");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(1);

const root = new Router();

root.get('/', async ctx => {
  ctx.body = ctx.req.user ? '<h1>LOGGED IN</h1>' : '<h1>NOT LOGGED IN</h1>';
});
root.get('/test', async ctx => {
  ctx.body = '<h1>test</h1>';
});

module.exports = root;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(1);
const passport = __webpack_require__(11);
/* eslint-disable-next-line global-require */
if (true) __webpack_require__(2).config();

const { FRONT_URL } = process.env;
const auth = new Router();

auth.get('/auth', passport.authenticate('github'));

auth.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/login' }), ctx => {
  ctx.redirect(FRONT_URL);
});

auth.get('/profile', ctx => {
  ctx.body = ctx.req.user || {
    message: 'Logged out'
  };
});
auth.get('/auth/logout', async ctx => {
  await ctx.logOut();
  ctx.body = {
    message: 'Logged out'
  };
  ctx.redirect(FRONT_URL);
});

module.exports = auth;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const GitHubStrategy = __webpack_require__(12).Strategy;
const passport = __webpack_require__(0);
/* eslint-disable-next-line global-require */
if (true) __webpack_require__(2).config();

// eslint-disable-next-line object-curly-newline
const { PORT, HOST, NODE_ENV, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: `http://${HOST}${NODE_ENV === 'development' && `:${PORT}`}/auth/callback`
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport-github");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map