import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class minSizeValidator implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 100000000;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (value.size < minSize) {
      throw new BadRequestException("El tamaño del archivo es muy pequeño");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    } else return value;
  }
}
