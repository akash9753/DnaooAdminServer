import SingleImage from"../models/image/singleImage.js";
import MultipleFile from"../models/image/multipleImages.js";
import cloudinary from"../lib/cloudinary.js";


export const singleImageUpload = async (req, res, next) => {
  try {
    const { path } = req.file;
      const result = await cloudinary.uploader.upload(path, {
        folder: "images",
        width: 1920,
      });

      const singleImage = new SingleImage({
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
        imageName: req.file.originalname,
        imageType: req.file.mimetype,
        imageSize: fileSizeFormatter(req.file.size, 2),
      });
      const result1 = await singleImage.save();
      res.status(201).send({
      success: true,
      message: "Image Uploaded Successfully",
      data: result1,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
      success: false,
    });
  }
};


export const multipleImageUpload = async (req, res, next) => {
  try {
    let filesArray = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      const result = await cloudinary.uploader.upload(path, {
        folder: "images",
        width: 1920,
      });

      const file = {
        public_id: result.public_id,
        url: result.secure_url,
        imageName: req.files[i].originalname,
        imageType: req.files[i].mimetype,
        imageSize: fileSizeFormatter(req.files[i].size, 2),
      };
      console.log(`file`,file);
      filesArray.push(file);
    }
    console.log(`filesArray`,filesArray);
    const multipleFiles = new MultipleFile({
      title: req.body.title || "sample",
      files: filesArray,
    });
    const result = await multipleFiles.save();
    res.status(201).send({
      success: true,
      message: "Images Uploaded Successfully",
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

// module.exports = {
//   singleImageUpload,
//   multipleImageUpload,
// };
