import Joi from '@hapi/joi';

export const addNewComment = Joi.object().keys({
  content: Joi.string().required(),
  postId: Joi.string().required(),
});
