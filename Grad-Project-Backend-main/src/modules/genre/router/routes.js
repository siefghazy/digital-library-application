import { Router } from "express";
import { addGenre,deleteGenre,getAllGenres,updateGenre } from "../controller/genreController.js";
import { upload } from "../middlewares/imageUploadMiddleware.js";
import { file } from "../middlewares/multermiddleware.js";
import { isAuth } from "../../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../../middleware/authorization.middleware.js";
import { isValid } from "../../../middleware/validation.middleware.js";
import { addgenreSchema,updateGenreSchema } from "../validations/genreValidation.js";
export const genreRouter=Router()
genreRouter.route('/')
.post(isAuth,isAuthorized('admin'),file.single('img'),isValid(addgenreSchema),upload({modelImage:'genreImage'}),addGenre)
.get(isAuth,getAllGenres)
genreRouter.route('/:id')
.delete(isAuth,isAuthorized('admin'),deleteGenre)
.put(isAuth,isAuthorized('admin'),file.single('img'),isValid(updateGenreSchema),upload({modelImage:'genreImage'}),updateGenre)
