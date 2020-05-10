import { Router } from 'express';
import PostController, { PostValidate } from '@/modules/web/post';
import { schemaValidator, camelCase, isAuth } from '@/middleware';
import { uploadSingleImage } from '@/loaders/upload';

const routes = (app) => {
  const route = Router();

  app.use('/posts', route);

  route.get('/new', isAuth(), PostController.getNewPost);
  route.post(
    '/new',
    isAuth(),
    uploadSingleImage('thumbnail'),
    camelCase(),
    schemaValidator(PostValidate.newPost),
    PostController.postNewPost,
  );

  route.get('/:id', PostController.getPostDetail);
};

export default routes;
