const joi = require("joi");

exports.contactsValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(2).max(100).required(),
    email: joi.string().min(6).max(100).required().email(),
    phone: joi
      .string()
      .min(4)
      .max(100)
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
  });
  return schema.validate(data);
};