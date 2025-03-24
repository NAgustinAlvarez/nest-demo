import { v2 } from "cloudinary";
import { config as dotenvConfig } from "dotenv";
import * as path from "path";
const envPath = path.resolve(__dirname, "../../.env.development");
dotenvConfig({ path: envPath });
console.log("Cloudinary Config:", {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
});
console.log("NODE_ENV:", process.env.NODE_ENV);
export const CloudinaryConfig = {
  provide: "CLOUDINARY",
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
