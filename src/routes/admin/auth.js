import { Router } from 'express';

const routes = (app) => {
  const route = Router();

  app.use('/auth', route);
};

export default routes;
