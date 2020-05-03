import bcrypt from 'bcryptjs';
import Models from '@/models';

const UserModel = Models.user;

export const registerUser = (data) => {
  return UserModel.create(data);
};

export const login = (username, password) => {
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
