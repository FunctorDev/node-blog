import Joi from '@hapi/joi';

export const register = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  name: Joi.string().required(''),
  avatar: Joi.string().empty(''),
  oldAvatar: Joi.string().empty(''),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
});
