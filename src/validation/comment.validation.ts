import Joi from 'joi';

export const CommentValidationSchema = Joi.object().keys({
  user: Joi.string().required(),
  post: Joi.string().required(),
  description: Joi.string().required().min(10).max(200),
});
