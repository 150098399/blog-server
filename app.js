var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const cors = require('cors');

// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  app.use(logger('dev'));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a',
  });
  app.use(
    logger('combined', {
      stream: writeStream,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://47.106.252.87:8001', // 允许前端应用的域名
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 允许携带凭据（如 Cookie）
  })
);

app.use(cookieParser());

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient,
});
app.use(
  session({
    secret: 'ceshiceshi',
    cookie: {
      // path: '/',   // 默认配置
      // httpOnly: true,  // 默认配置
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/blog', blogRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
