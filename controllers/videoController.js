import SingleVideoModel from "../models/video/singleVideo.js";
import MultipleVideoUpload from "../models/video/multipleVideo.js";
import cloudinary from "../lib/cloudinary.js";

console.log(`process.env.CLOUD_NAME video ctrl`,process.env.CLOUD_NAME);

export const uploadSingleVideo = async (req, res) => {
  console.log(`req.`,req);
  const singleVodeo = req.file;
  try {
    const result = await cloudinary.uploader.upload(singleVodeo.path, {
      resource_type: "video",
      folder: "video",
    });
    console.log("akash",result);
    let arr = []
    arr=req.body.tags
    let upload = new SingleVideoModel({
      videoName: singleVodeo.originalname,
      videoUrl: result.url,
      cloudinary_id: result.public_id,
      videoType: singleVodeo.mimetype,
      videoSize: fileSizeFormatter(singleVodeo.size, 2),
      videoTitle: req.body.title,
      videoCategory:req.body.videoCategory,
      videoUploaderName:req.body.videoUploaderName,
      videoDescription:req.body.videoDescription,
      videoUploaderEmailId:req.body.videoUploaderEmailId,
      tags:arr,
      likes:req.body.likes,
      videoUploaderId:req.body.videoUploaderId,
    });
    const result1 = await upload.save();
    return res.status(200).send({
      success: true,
      data: result1,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

export const uploadMultipleVideo = async (req, res) => {
  try {
    console.log(`req.files`, req.files);
    let uploads = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path,unique_filename => false, {
        resource_type: "video",
        folder: "video",
      });
      const upload = {
        name: req.files[i].originalname,
        url: result.url,
        cloudinary_id: result.public_id,
        fileType: req.files[i].mimetype,
        fileSize: fileSizeFormatter(req.files[i].size, 2),
      };
      console.log(`upload`, upload);
      uploads.push(upload);
    }
    console.log(`uploads`, uploads);
    const multipleVideos = new MultipleVideoUpload({
      title: req.body.title || "sample",
      videos: uploads,
    });
    const result = await multipleVideos.save();
    res.status(201).send({
      success: true,
      message: "videos Uploaded Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
      success: false,
    });
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

