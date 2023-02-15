import Joi from 'joi';

export const UserValidationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profilePhoto: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
