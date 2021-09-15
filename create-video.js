require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const axios = require("axios");

const config = cloudinary.config();
const cloudName = config.cloud_name;
const apiKey = config.api_key;
const apiSecret = config.api_secret;
const notificationUrl = "https://webhook.site/a7cbf678-adf7-4847-8586-96e6825cea46";

// const apiSecret = config.api_secret;
// console.log(apiSecret);

// console.log("cloud config", cloudinary.config());
const timestamp = Math.floor(new Date().getTime() / 1000);
console.log("timestamp", timestamp);
const publicId = "test_slide_video_2";
const replace = true;
const manifest = {
  w: 500,
  h: 500,
  du: 13,
  fps: 20,
  vars: {
    transition_s: "circledrop",
    sdur: 3000,
    tdur: 1500,
    slides: [
      {
        media: "i:test_000",
      },
      {
        media: "i:test_001",
      },
      {
        media: "i:test_000",
      },
      {
        media: "i:test_001",
      },
    ],
  },
};
function createVideo() {
  // const paramsToSign = `public_id=${publicId}&resource_type="video"&manifest_json=${JSON.stringify(manifest)}&timestamp=${timestamp}&api_key=${apiKey}`;

  // const paramsToSign = `manifest_json=${JSON.stringify(manifest)}&public_id=${publicId}&timestamp=${timestamp}`;
  const paramsToSign = {
    manifest_json: JSON.stringify(manifest),
    public_id: publicId,
    timestamp: timestamp,
  };
  console.log("params:", paramsToSign);
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  console.log("sig", signature);
  const body = {
    public_id: publicId,
    api_key: apiKey,
    notification_url: "https://webhook.site/a7cbf678-adf7-4847-8586-96e6825cea46",
    resource_type: "video",
    timestamp: timestamp,
    signature: signature,
    manifest_json: JSON.stringify(manifest),
  };
  axios
    .post(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`,
      body
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(JSON.stringify(error, null, 2));
    });
}

createVideo();
