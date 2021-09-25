/* eslint-disable no-plusplus */
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../utils/cloudinary');

//* @desc Upload Images Cloudinary
//* @route POST api/v1/users/register
//* @access Private/Admin

exports.uploadController = asyncHandler(async (req, res) => {
  const data = req.body.uri;
  console.log(typeof data);

  try {
    const uploadedResponse = await cloudinary.uploader.upload(data, {
      upload_preset: 'Lux-house-store',
    });

    res.json(uploadedResponse.url);
  } catch (error) {
    console.error(error);
    res.json({ msg: 'fail' });
  }
});
exports.uploadMultipleController = asyncHandler(async (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    const imagePath = req.body[i].uri;
    console.log(imagePath);
    cloudinary.uploader
      .upload(imagePath)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  }
});
