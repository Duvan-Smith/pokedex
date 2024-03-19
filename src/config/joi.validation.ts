import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    MONGODBPOKEMON: Joi.required(),
    MONGODBTIENDA: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
})