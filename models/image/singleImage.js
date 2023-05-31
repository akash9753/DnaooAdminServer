import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const singleImageSchema = new Schema({
    imageName:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    imageType:{
        type:String,
        required:true
    },
    imageSize:{
        type:String,
        required:true
    },
    cloudinary_id:{
      type:String,
      required:true
  },

},{timestamps:true})

// module.exports = mongoose.model('SingleImage',singleImageSchema);

const singleImageModel = mongoose.model('SingleImage',singleImageSchema);
export default singleImageModel; 