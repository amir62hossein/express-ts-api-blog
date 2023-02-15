import Joi from 'joi-oid';

export const objectIdValidationSchema = Joi.object({
  id: Joi.objectId(),
});
