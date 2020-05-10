import Joi from '@hapi/joi';

export const newPost = Joi.object().keys({
  title: Joi.string().required(),
  slug: Joi.string(),
  content: Joi.string(),
  summary: Joi.string(),
  tags: Joi.string(),
  category: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string())
    .required(),
  thumbnail: Joi.string(),
  status: Joi.string().valid('PUBLISH'),
});
