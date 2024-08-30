import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "dygkwfork",
  api_key: "176761614346139",
  api_secret: "XG5mWRKmQePI3W6kt5LXFgWzllE", // Click 'View API Keys' above to copy your API secret
});

const uploadOnClodinary = async (localFile) => {
  try {
    if (!localFile) return null;
    const res = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });

    console.log("file upload to cloudinary successfully.");
    return res;
  } catch (error) {
    fs.unlinkSync(localFile);
  }
};

export default uploadOnClodinary;
