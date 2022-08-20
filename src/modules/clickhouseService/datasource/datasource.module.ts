import { Module } from '@nestjs/common';
import { DataSourceController } from './datasouce.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  DATA_SOURCE_SERVICE_NAME,
  DATASOURCE_PACKAGE_NAME,
} from './datasource.pb';
import { resolve } from 'path';

// when in debug mod, protoPath is relative to ${projectRoot}/dist/ because we use webpack for hmr
const pathMap = {
  debug: '../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto',
  dev: '../../../../../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto',
  production: '../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto',
};

const protoPath =
  pathMap[process.env.NODE_ENV] ??
  '../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto';

@Module({
  controllers: [DataSourceController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SOURCE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '123.11.2.135:50051',
          package: DATASOURCE_PACKAGE_NAME,
          protoPath: resolve(__dirname, protoPath),
        },
      },
    ]),
  ],
})
export class DataSourceModule {}
