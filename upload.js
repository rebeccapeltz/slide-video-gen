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


for (let i =0; i<=5; i++){
  uploadImage(`./slides_00${i}.png`);
}
