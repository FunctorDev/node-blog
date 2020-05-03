import * as AuthService from './auth.service';
import { generateJWTToken } from '@/helpers/jwt';

export const login = (req, res) => {
  res.render('admin/pages/login');
};

export const postLogin = (req, res) => {
  const { username, password } = req.body;

  AuthService.login(username, password)
    .then((user) => {
      if (user) {
        const token = generateJWTToken({ id: user.id });
        return res.status(200).send({ auth: true, token });
      }

      return res.status(401).send({ auth: false, token: null });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('There was a problem in login.');
    });
};

export const postRegister = (req, res) => {
  const { username, password } = req.body;

  AuthService.registerUser({
    username,
    password,
  })
    .then((user) => {
      const token = generateJWTToken({ id: user.id });
      res.status(200).send({ auth: true, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('There was a problem registering the user.');
    });
};
