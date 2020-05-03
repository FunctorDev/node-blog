import { Router } from 'express';
import homeRoutes from './home';

const routes = () => {
  const app = Router();

  homeRoutes(app);

  return app;
};

export default routes;
