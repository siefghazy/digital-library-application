import { Router } from 'express';
import { isValid } from '../../middleware/validation.middleware.js';
import { isAuth } from '../../middleware/authentication.middleware.js';
import { isAuthorized } from '../../middleware/authorization.middleware.js';
import { fileUpload, filterObject } from '../../utils/multer.js';
import { addSchema } from './book.validation.js';
import * as book from './book.controller.js';
import fileupload from './multerBookMiddleware.js';

const router = Router();

router.post(
  '/add',
  isAuth,
  isAuthorized('admin'),
 fileupload,
  isValid(addSchema),
  book.createBook
);

router.route('/').get(book.GetAllBooks);

router
  .route('/:id')
  .get(book.GetBook)
  .patch(book.UpdateBook)
  .delete(book.DeleteBook);
router
.route('/recent')
.get(book.getRecent)

export default router;
