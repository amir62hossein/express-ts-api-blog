import Joi from 'joi';

export const CategoryValidationSchema = Joi.object().keys({
  user: Joi.string().required(),
  title: Joi.string().min(10).required(),
});
