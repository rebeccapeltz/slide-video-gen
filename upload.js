require('dotenv').config()
const cloudinary = require('cloudinary').v2

function uploadImage (fn) {
  console.log(fn)
  cloudinary.uploader
    .upload(fn, {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      invalidate: true
    })
    .then(uploadResult => {
      const url = uploadResult.secure_url
      console.log(url)
    })
    .catch(error => console.error(error))
}

uploadImage('./test_000.png')
uploadImage('./test_001.png')