import { Injectable } from "@nestjs/common";
import { UploadApiResponse, UploadApiErrorResponse, v2 } from "cloudinary";
import * as toStream from "buffer-to-stream";

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!file || !file.buffer) {
      throw new Error("Archivo no válido o buffer no definido");
    }

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            reject(new Error(error.message));
          } else if (result) {
            resolve(result);
          } else {
            reject(
              new Error(
                "La subida a Cloudinary no devolvió un resultado válido",
              ),
            );
          }
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toStream(file.buffer).pipe(upload);
    });
  }
}
