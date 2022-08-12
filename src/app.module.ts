import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSetModule } from './modules/clickhouseService/dataset/dataset.module';
import { DataSourceModule } from './modules/clickhouseService/datasource/datasource.module';
import { SearchModule } from './modules/clickhouseService/search/search.module';
import { TableModule } from './modules/clickhouseService/table/table.module';

@Module({
  imports: [DataSourceModule, DataSetModule, SearchModule, TableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
