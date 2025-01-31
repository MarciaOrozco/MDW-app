import Joi from "joi";

export const addBookSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "A book name is required",
  }),
  author: Joi.string().required().messages({
    "string.empty": "An author is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "A description is required",
  }),
  price: Joi.number().required().positive().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than zero",
    "any.required": "A price is required",
  }),
  isbn: Joi.string().required().messages({
    "string.empty": "An ISBN code is required",
  }),
  image: Joi.string().allow("").optional(),
  isAvailable: Joi.boolean().default(false),
});
