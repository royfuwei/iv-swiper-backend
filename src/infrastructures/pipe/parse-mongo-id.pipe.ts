import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const isValid = isMongoId(value);
    if (!isValid) {
      throw new BadRequestException(['id should be a mongoId']);
    }
    return value;
  }
}
