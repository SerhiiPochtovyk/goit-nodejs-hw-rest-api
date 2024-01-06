import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";
import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const schema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().min(6).max(100).required().email(),
  phone: Joi.string()
    .min(4)
    .max(100)
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean,
});

export const Contact = model("contact", contactSchema);

export const contactsValidation = (data) => {
  return schema.validate(data);
};
