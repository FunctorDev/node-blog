import { wrapError } from '@/utils/common';
import fs from 'fs';
import path from 'path';
import * as AuthService from './auth.service';
import { generateJWTToken } from '@/helpers/jwt';
import { omit } from 'ramda';
import { fileUploadUrl, getRequestFileName } from '@/utils';
import { PATH_ROOT } from '@/config';

const renderRegister = (res, data = {}) => {
  const { errors = [], oldInput = {} } = data;

  res.render('web/pages/register', {
    errors,
    oldInput,
  });
};

export const getRegister = wrapError((req, res) => {
  renderRegister(res);
});

export const postRegister = wrapError((req, res) => {
  const data = {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    avatar: getRequestFileName('avatar', req),
  };
  const errors = req.joiError || req.multerError;
  const renderInvalid = (err) => {
    res.status(422);
    return renderRegister(res, {
      errors: err,
      oldInput: {
        ...data,
        avatar_url: fileUploadUrl(data.avatar, 'tmp'),
      },
    });
  };

  if (errors) {
    return renderInvalid(errors);
  }

  return AuthService.register(omit(['confirmPassword'], data))
    .then(() => {
      res.redirect('/auth/login');
    })
    .then(() => {
      const oldPath = path.join(PATH_ROOT, 'storage', 'tmp', data.avatar);
      const newPath = path.join(PATH_ROOT, 'storage', 'uploads', data.avatar);
      return fs.promises.rename(oldPath, newPath);
    })
    .catch((error) => {
      return renderInvalid([error]);
    });
});

// ------------------------------------------------------------------------------------------------------------------ //

const renderLogin = (res, data = {}) => {
  const { errors = [], oldInput = {} } = data;

  res.render('web/pages/login', {
    errors,
    oldInput,
  });
};

export const getLogin = wrapError((req, res) => {
  renderLogin(res);
});

export const postLogin = wrapError((req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  const errors = req.joiError || req.multerError;
  const renderInvalid = () => {
    res.status(422);
    return renderLogin(res, {
      errors: [
        {
          message: 'Tên tài khoản hoặc mật khẩu không đúng',
        },
      ],
      oldInput: data,
    });
  };

  if (errors) {
    return renderInvalid();
  }

  return AuthService.login(data).then((user) => {
    if (user) {
      const token = generateJWTToken({ id: user.id });
      res.cookie('token', token);
      res.redirect('/');
    } else {
      renderInvalid();
    }
  });
});
