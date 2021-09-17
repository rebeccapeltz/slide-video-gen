require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const axios = require("axios");

const publicId = "slides-video";

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

const manifest = {
  w: 500,
  h: 500,
  du: 30,
  fps: 20,
  vars: {
    transition: "s:linearblur",
    sdur: 3000,
    tdur: 1500,
    slides: [
      {
        media: "i:slides_000",
      },
      {
        media: "i:slides_001",
      },
      {
        media: "i:slides_002",
      },
      {
        media: "i:slides_003",
      },
      {
        media: "i:slides_004",
      },
      {
        media: "i:slides_005",
      },
    ],
  },
};
function createVideo() {
  const paramsToSign = {
    manifest_json: JSON.stringify(manifest),
    public_id: publicId,
    // notification_url: notificationUrl,
    timestamp: timestamp,
  };
  console.log("params:", paramsToSign);
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  console.log("sig", signature);

  const body = {
    public_id: publicId,
    // notification_url: notificationUrl,
    api_key: apiKey,
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
