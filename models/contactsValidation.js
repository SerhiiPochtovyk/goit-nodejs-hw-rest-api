import Joi from "joi";
import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import addUpdateSetting from "../helpers/addUpdateSettings.js";

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
        }
    }
);

contactSchema.post("save", handleMongooseError);
contactSchema.pre("findOneAndUpdate", addUpdateSetting);
contactSchema.post("findOneAndUpdate", handleMongooseError);

export const addSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(6).max(100).required().email(),
    phone: Joi.string()
        .min(4)
        .max(100)
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required(),
    favorite: Joi.boolean,
});

export const updateSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    email: Joi.string().min(6).max(100).email(),
    phone: Joi.string()
        .min(4)
        .max(100)
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
    favorite: Joi.boolean,
});

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export const contactsValidation = (data) => {
    return schema.validate(data);
};

export default Contact;