import { Router } from 'express';
import CommentController , { CommentValidate } from '@/modules/web/comment';
import { schemaValidator, isAuth } from '@/middleware';

const routes = (app) => {
  const route = Router();

  app.use('/comments', route);

  route.post(
    '/new',
    isAuth(),
    schemaValidator(CommentValidate.addNewComment),
    CommentController.addNewComment,
  );
};

export default routes;
