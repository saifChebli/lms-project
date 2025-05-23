import cloudinary from 'cloudinary';
//import Razorpay from 'razorpay';

import connectionToDB from './config/db.config.js';
import app from './app.js';

const PORT= process.env.PORT || 5000;

/**
 * @Cloudinary configuration for file storage service
 */
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:process.env.CLOUDINARY_SECURE,
})
/**
// * @Razorpay configuration for payment gateway
 */
//export const razorpay =new Razorpay({
 //   key_id: process.env.RAZORPAY_KEY_ID,
  //  key_secret: process.env.RAZORPAY_SECRET,
//})
app.listen(PORT,async ()=>{
    await connectionToDB();
    console.log(`App is running at  http:localhost:${PORT} `);
})