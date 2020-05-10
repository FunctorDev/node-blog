import Joi from '@hapi/joi';

export const addPostLike = Joi.object().keys({
  postId: Joi.string().required(),
});
