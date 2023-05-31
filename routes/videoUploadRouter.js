import  express  from "express";
const router = express.Router();
import {uploadSingleVideo,uploadMultipleVideo} from '../controllers/videoController.js';
import auth from "../middleware/auth.js";
import storage from '../lib/multer.js';

router.post('/singleVideo',auth, storage.single('file'), uploadSingleVideo);
router.post('/multipleVideo',auth, storage.array('files'), uploadMultipleVideo);

export default router;