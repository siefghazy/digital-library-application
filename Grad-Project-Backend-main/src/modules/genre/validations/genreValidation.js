import joi from "joi";
export const addgenreSchema=joi.object({
        name:joi.string().required()
})
export const updateGenreSchema=joi.object({
        name:joi.string()
})
