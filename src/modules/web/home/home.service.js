import models from '@/models';

const PostModel = models.post;
const UserModel = models.user;

export const getDataHomePage = () => {
  return PostModel.findAll({
    include: [
      {
        model: UserModel,
      },
    ],
  });
};
