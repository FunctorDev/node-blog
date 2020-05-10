import bcrypt from 'bcryptjs';
import models from '@/models';

const UserModel = models.user;

export const register = (data) => {
  return UserModel.findOne({
    where: {
      username: data.username,
    },
  }).then((user) => {
    if (user) {
      return Promise.reject(new Error('Tài khoản đã tồn tại'));
    }

    return UserModel.create(data);
  });
};

export const login = ({ username, password }) => {
  return UserModel.findOne({
    where: {
      username,
    },
  }).then((user) => {
    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      return passwordIsValid ? user : null;
    }

    return null;
  });
};
