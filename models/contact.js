const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require('../helpers/handleMongooseError');

const nameRegex = '^[A-Z][a-z]+ [A-Z][a-z]+$';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(nameRegex)).required().messages({
    'any.required': `Missing required name field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `Missing required email field`,
  }),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': `Missing field favorite` }),
});

const Contact = model('contacts', contactSchema);


module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
