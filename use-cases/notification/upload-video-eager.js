require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// this eager upload transformation is good for processing short form video (duration <1 minute)
// eager async upload to create derived optimized transformations
// asynchronously to avoid delays with on the fly transformations

// Your webhook might looks like this: https://my-cld-webhooks.netlify.app/.netlify/functions/webhook_notify_email

cloudinary.uploader
  .upload("./assets/roller-skating.mp4", {
    // public_id: "roller-skating",
    type: "upload",
    overwrite: true,
    invalidate: true,
    resource_type: "video",
    tags: "cust-training-2022",
    eager: [
      { raw_transformation: "f_webm,vc_vp9,q_auto/mp4" },
      { raw_transformation: "f_mp4,vc_h265,q_auto/mp4" },
      { raw_transformation: "f_mp4,vc_h264,q_auto/mp4" },
    ],
    eager_async: true,
    eager_notification_url:"https://rpeltz-cld-webhooks.netlify.app/.netlify/functions/webhook_notify_email",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
