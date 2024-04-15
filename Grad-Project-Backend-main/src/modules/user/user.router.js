import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { activationSchema, registerSchema, loginSchema, forgetCodeSchema, resetPasswordSchema } from "./user.validation.js";
import { isAuth } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as user from './user.controller.js'
import { getWishlist,updateWishlist } from "./wishlistController.js";
const router = Router()

//Register
router.post('/register', isValid(registerSchema), user.register)
// Activation
router.get('/confirmEmail/:activationCode', isValid(activationSchema), user.confirmEmail)
//Login
router.post('/login', isValid(loginSchema), user.login)
//Send forget code
router.patch('/forgetCode', isValid(forgetCodeSchema), user.forgetCode)
//Reset password
router.patch('/resetPassword', isValid(resetPasswordSchema), user.resetPassword)
router.route('/wishlist')
.get(isAuth,isAuthorized('user'),getWishlist)
.put(isAuth,isAuthorized('user'),updateWishlist)
export default router
