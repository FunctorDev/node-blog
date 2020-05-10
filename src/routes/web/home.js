import { Router } from 'express';
import HomeController from '@/modules/web/home';

const routes = (app) => {
  const route = Router();

  app.use('', route);

  route.get('', HomeController.homePage);
};

export default routes;
