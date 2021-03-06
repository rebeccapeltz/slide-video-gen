require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// https://cloudinary.com/documentation/image_upload_api_reference#explode_method

// cloudinary.uploader
// .upload("./TestSlide.pdf", {
//   public_id: "TestSlide",
//   type: 'upload',
//   invalidate: true
// })
// .then(uploadResult => {
//   const url = uploadResult.secure_url
//   console.log(url)
// })

// cloudinary.uploader
//   .explode("TestSlide", { page: "all" })
//   .then((uploadResult) => {
//     const url = uploadResult.secure_url;
//     console.log(url);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// cloudinary.uploader.explode('Test_Slides.pdf', 
//   { page: 'all'},
//   function(error,result) {console.log(result, error) });

const page3 = cloudinary.url("TestSlide.png", {transformation: [
  {width: 400, crop: "scale"},
  {page: 3},
  {format: "png"}
  ]},
)
  console.log(page3)
