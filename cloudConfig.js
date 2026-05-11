//Require cloudinary and Cloudinary Storage
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudApiKey = process.env.CLOUD_API_KEY || process.env.CLOUD_API_kEY;

//Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: cloudApiKey,
    api_secret: process.env.CLOUD_API_SECRET,
});


//Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats: async (req, file) => ["png", "jpeg", "jpg", "avif"], // supports promises as well
  },
});


//Export Cloudinary and Storage
module.exports = {
    cloudinary,
    storage,
};
