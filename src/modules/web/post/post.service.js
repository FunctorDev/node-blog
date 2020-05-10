import { omit } from 'ramda';
import models from '@/models';

const sequelize = models.sequelize;
const Sequelize = models.Sequelize;

const CategoryModel = models.category;
const CommentModel = models.comment;
const LikeModel = models.like;
const PostModel = models.post;
const TagModel = models.tag;
const UserModel = models.user;

export const getPostData = () => {
  return CategoryModel.findAll();
};

export const createPost = (data, currentUser) => {
  const postData = omit(['oldThumbnail', 'category'], data);
  const tags = data.tags
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((tag) => ({
      name: tag,
    }));

  return sequelize.transaction(() => {
    const post = PostModel.build(
      {
        ...postData,
        tags,
      },
      {
        include: [
          {
            model: TagModel,
          },
        ],
      },
    );
    post.setUser(currentUser, { save: false });

    return post.save().then((p) => {
      return p.addCategories(data.category, {
        save: false,
      });
    });
  });
};

export const getPostDetail = (id, currentUser) => {
  const { Op } = Sequelize;

  return PostModel.findOne({
    where: {
      [Op.or]: [
        {
          id,
        },
        {
          slug: id,
        },
      ],
    },
    include: [
      {
        model: UserModel,
      },
    ],
  }).then((post) => {
    return Promise.all([
      post.getComments({
        where: {
          parent_id: {
            [Op.is]: null,
          },
        },
        include: [
          {
            model: UserModel,
          },
          {
            model: CommentModel,
            as: 'children',
          },
        ],
      }),
      post.countLikes(),
      post.getLikes({
        where: {
          user_id: currentUser ? currentUser.id : null,
        },
      }),
    ]).then(([comments, totalLike, didMeLike]) => {
      post.comments = comments;
      post.totalLike = totalLike;
      post.didMeLike = Boolean(didMeLike.length);
      // post.setDataValue('comments', comments);
      // post.setDataValue('totalLike', totalLike);
      return post;
    });
  });
};
