/* eslint-disable no-plusplus */
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../utils/cloudinary');

//* @desc Upload Images Cloudinary
//* @route POST api/v1/upload
//* @access Private/Admin

exports.uploadController = asyncHandler(async (req, res) => {
  const data = req.body.uri;

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

//* @desc Upload Images Cloudinary
//* @route POST api/v1/upload/multiple
//* @access Private/Admin
exports.uploadMultipleController = asyncHandler(async (req, res) => {
  const data = req.body.dataList;
  console.log(data.length);

  const imgUrl = [];

  if (data && data.length > 0) {
    data.map(async (image) => {
      const receivedUrls = await cloudinary.uploader.upload(image.uri);
      imgUrl.push(receivedUrls);
      if (imgUrl.length === data.length) {
        console.log(imgUrl);
        return res.send(imgUrl);
      }
    });
  }
});

// for (let i = 0; i < req.body.length; i++) {
//   const imagePath = req.body[i].uri;
//   console.log(imagePath);
//   cloudinary.uploader
//     .upload(imagePath)
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log('error');
//       console.log(err);
//     });
// }
