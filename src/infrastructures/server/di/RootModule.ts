import { Module } from '@nestjs/common';
import { AppModule } from 'src/core/app/app.module';

@Module({
  imports: [AppModule],
})
export class ServerRootModule {}
