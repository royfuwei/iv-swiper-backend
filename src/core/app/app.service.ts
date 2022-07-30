import { Injectable } from '@nestjs/common';
import { AppDTO } from './dto/app.dto';
import { APP_NAME } from '../../constants';

@Injectable()
export class AppService {
  getHello(): AppDTO {
    return {
      app: APP_NAME,
    };
  }
}
