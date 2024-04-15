import joi from "joi";

export const addSchema = joi
  .object({
    title: joi.string().min(2).max(20).required(),
    description: joi.string().required(),
    isbn: joi.string().required(),
    author: joi.string().required(),
    url: joi.string().required()
  })
  .required();
