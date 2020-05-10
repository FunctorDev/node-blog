import { Router } from 'express';
import AuthController, { AuthValidate } from '@/modules/web/auth';
import { schemaValidator, camelCase } from '@/middleware';
import { uploadSingleImage } from '@/loaders/upload';

const routes = (app) => {
  const route = Router();

  app.use('/auth', route);

  route.get('/register', AuthController.getRegister);
  route.post(
    '/register',
    (req, res, next) => {
      req.uploadDestination = 'storage/tmp';
      next();
    },
    uploadSingleImage('avatar'),
    camelCase(),
    schemaValidator(AuthValidate.register),
    AuthController.postRegister,
  );

  route.get('/login', AuthController.getLogin);
  route.post(
    '/login',
    schemaValidator(AuthValidate.login),
    AuthController.postLogin,
  );
};

export default routes;
