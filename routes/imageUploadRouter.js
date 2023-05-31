import  express  from "express";
import { singleImageUpload,multipleImageUpload } from "../controllers/imageController.js"

import uploadImage from'../helpers/fileHepler.js';

//router object
const router = express.Router()

//Auth || POST
 router.post('/singleImage', uploadImage.single('file'), singleImageUpload);
 router.post('/multipleImage', uploadImage.array('files'), multipleImageUpload);

 export default router;

