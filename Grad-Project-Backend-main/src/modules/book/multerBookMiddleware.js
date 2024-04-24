import multer from "multer"
import { v4 as uuidv4 } from 'uuid'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,uuidv4()+'-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  const fileupload =upload.fields([{ name:'images',maxCount:3},{name:"defaultImage",maxCount:1},{name:"book",maxCount:1}])
  export default fileupload