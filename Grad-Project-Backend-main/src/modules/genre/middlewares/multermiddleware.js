import multer from "multer"
const storage = multer.diskStorage({})
  function fileFilter (req, file, cb) {

  if(!file.mimetype.startsWith('image')){
    cb(null, false)
  }
    cb(null, true)
  }
  export const file=multer({fileFilter,storage})