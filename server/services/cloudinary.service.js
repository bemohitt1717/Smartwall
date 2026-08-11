import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary =  async (bufferData) => {
// console.log("buffer data :", bufferData);

return new Promise((resolve, reject)=>{
    const uploadStream = cloudinary.uploader.upload_stream(
        {folder : "smartwall"},
        (err, res)=>{
            if(err) return err;
            resolve(res);
        }
    );
    streamifier.createReadStream(bufferData).pipe(uploadStream);
})

}

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default uploadToCloudinary;