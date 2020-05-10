import models from '@/models';

const sequelize = models.sequelize;

const LikeModel = models.like;

export const addPostLike = (currentUser, postId) => {
  return sequelize.transaction(() => {
    return LikeModel.findOne({
      where: {
        user_id: currentUser.id,
      },
    }).then((like) => {
      if (like) {
        return like.destroy();
      }

      const l = LikeModel.build({});
      l.setUser(currentUser, { save: false });
      l.setPost(postId, { save: false });
      return l.save();
    });
  });
};
