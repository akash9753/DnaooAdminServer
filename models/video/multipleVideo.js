import mongoose from 'mongoose';
const schema = mongoose.Schema;

var multipleVideoSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    videos: [Object],
  },
  { timestamps: true }
);

const multipleVideoUpload = mongoose.model("multipleVideo", multipleVideoSchema);
export default multipleVideoUpload ;