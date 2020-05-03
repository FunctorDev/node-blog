import { Router } from 'express';

const routes = (app) => {
  const route = Router();

  app.use('', route);

};

export default routes;
