import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from './modules/clickhouseService/datasource/datasource.module';

@Module({
  imports: [DataSourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
