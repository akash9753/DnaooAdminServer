import mongoose from "mongoose";
const schema = mongoose.Schema;

var singleVideoSchema = new schema(
  {
    videoTitle: {
      type: String,
      required: true,
    },
    videoName: {
      type: String,
      required: true,
    },
    videoUploaderName: {
      type: String,
      required: true,
    },
    videoUploaderEmailId: {
      type: String,
      required: true,
    },
    videoUploaderId: {
      type: String,
      required: true,
    },
    verificationStatus: {
      type: Boolean,
      default:false
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
    },
    videoType: {
      type: String,
      required: true,
    },
    videoSize: {
      type: String,
      required: true,
    },
    videoCategory: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    tags: [],
    likes: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const singleVideoModel = mongoose.model("singleVideo", singleVideoSchema);
export default singleVideoModel;
