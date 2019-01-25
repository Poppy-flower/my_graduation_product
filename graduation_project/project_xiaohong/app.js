var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var webpackDevMiddleware = require("webpack-dev-middleware");
var WebpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require("./webpack.config.js");
var webpack = require('webpack');

var compiler = webpack(webpackConfig);

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);

app.use(webpackDevMiddleware(compiler, {
    publicPath: "", // 大部分情况下和 `output.publicPath`相同,
    quiet: true
}));
app.use(WebpackHotMiddleware(compiler))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'imgs')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
