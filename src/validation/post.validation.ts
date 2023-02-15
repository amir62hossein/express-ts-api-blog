import Joi from 'joi';

export const PostValidationSchema = Joi.object().keys({
  user: Joi.string().required(),
  title: Joi.string().min(5).required(),
  description: Joi.string().required().min(50),
  category: Joi.string().required(),
  photo: Joi.string().required(),
});
