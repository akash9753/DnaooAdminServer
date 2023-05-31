// import cloudinaryModule from "cloudinary";
import dotenv from "dotenv"
dotenv.config()
// const cloudinary = cloudinaryModule.v2;
import {v2 as cloudinary} from "cloudinary"
console.log(`process.env.CLOUD_NAME cloudnary.js`,process.env.CLOUD_NAME);
cloudinary.config({ 
     cloud_name: process.env.CLOUD_NAME, 
     api_key: process.env.API_KEY, 
     api_secret: process.env.API_SECRET
  });

export default cloudinary;