import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSetModule } from './modules/clickhouseService/dataset/dataset.module';
import { DataSourceModule } from './modules/clickhouseService/datasource/datasource.module';

@Module({
  imports: [DataSourceModule, DataSetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
