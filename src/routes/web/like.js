import { Router } from 'express';
import LikeController , { LikeValidate } from '@/modules/web/like';
import { schemaValidator, isAuth } from '@/middleware';

const routes = (app) => {
  const route = Router();

  app.use('/likes', route);

  route.post(
    '/new',
    isAuth(),
    schemaValidator(LikeValidate.addPostLike),
    LikeController.addPostLike,
  );
};

export default routes;
