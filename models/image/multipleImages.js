import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mulitipleImageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    files: [Object]
}, {timestamps: true});

// module.exports = mongoose.model('MultipleImages', mulitipleImageSchema);
const mulitipleImageModel = mongoose.model('MultipleImages', mulitipleImageSchema);
export default mulitipleImageModel;