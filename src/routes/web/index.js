import { Router } from 'express';
import * as dateFns from 'date-fns';
import homeRoutes from './home';
import authRoutes from './auth';
import postRoutes from './post';
import commentRoutes from './comment';
import likeRoutes from './like';
import { withAuthentication } from '@/middleware';

const attachLocals = (req, res, next) => {
  res.locals.currentUser = req.currentUser;
  res.locals.dateFns = dateFns;
  next();
};

const routes = () => {
  const app = Router();

  app.use(withAuthentication());
  app.use(attachLocals);

  homeRoutes(app);
  authRoutes(app);
  postRoutes(app);
  commentRoutes(app);
  likeRoutes(app);

  return app;
};

export default routes;
