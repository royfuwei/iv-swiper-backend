import { NestFactory } from '@nestjs/core';
import { ServerRootModule } from './infrastructures/server/di/RootModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PORT, APP_NAME } from './constants';
import { INestApplication, Logger } from '@nestjs/common';

const initLogger = new Logger('MainInitialApp');

const genSwaggerDocument = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription('後端面試用API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  initLogger.log('SwaggerModule setup swagger api!!');
};

async function bootstrap() {
  const app = await NestFactory.create(ServerRootModule);
  genSwaggerDocument(app);
  await app.listen(PORT);
  initLogger.log(`App is running at http://localhost:${PORT}`);
  initLogger.log('Press CTRL-C to stop');
}
bootstrap();
