import models from '@/models';

const sequelize = models.sequelize;

const CommentModel = models.comment;

export const addNewComment = (comment, currentUser, postId) => {
  return sequelize.transaction(() => {
    const post = CommentModel.build(comment);
    post.setUser(currentUser, { save: false });
    post.setPost(postId, { save: false });
    return post.save();
  });
};
