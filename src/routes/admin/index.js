import { Router } from 'express';
import authRoutes from './auth';

const routes = () => {
  const app = Router();

  authRoutes(app);

  return app;
};

export default routes;
