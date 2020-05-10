import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import flash from 'connect-flash';
import session from 'express-session';
import morgan from 'morgan';

import { API_PREFIX, PATH_ROOT } from '@/config';

import apiRoutes from '@/routes/api';
import webRoutes from '@/routes/web';
import adminRoutes from '@/routes/admin';

import camelcase from '@/middleware/camelCase';

const loader = (app, env) => {
  app.get('/ping', (req, res) => {
    res.status(200).end('pong');
  });

  // Use ejs for views
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', '/views'));

  // Static files
  app.use(express.static(path.join(PATH_ROOT, '/public')));
  app.use(express.static(path.join(PATH_ROOT, '/storage/')));

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Helmet will set various HTTP headers to help protect your app.
  app.use(helmet());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Cookie
  app.use(cookieParser());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    session({
      secret: 'Lanh Khoc',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(flash());

  app.use(camelcase());

  app.use(API_PREFIX, apiRoutes());
  app.use('/admin', adminRoutes());
  app.use(webRoutes());

  // / Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found: ' + req.url);
    err.status = 404;
    next(err);
  });

  // / Error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  // WTF: If we don't have next, an error will show up in console?
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    if (env.NODE_ENV === 'production') {
      return res.send(`Something wen't wrong`);
    }

    res.send(`
      <h1>Hey!! We caught the error:</h1>
      <h2>${err.message}</h2>
      <pre>${err.stack}</pre>
    `);
  });
};

export default loader;
