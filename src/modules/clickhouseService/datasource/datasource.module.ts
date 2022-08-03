import { Module } from '@nestjs/common';
import { DataSourceController } from './datasouce.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  DATA_SOURCE_SERVICE_NAME,
  CLICKHOUSE_JAVA_DATASOURCE_PACKAGE_NAME,
} from './datasource.pb';
import { resolve } from 'path';

console.log(
  '%c __dirname >>>',
  'background: yellow; color: blue',
  resolve(
    __dirname,
    '../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto',
  ),
);

// when in debug mod, protoPath is relative to ${projectRoot}/dist/ because we use webpack for hmr
const protoPath =
  process.env.NODE_ENV === 'debug'
    ? '../../../../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto'
    : '../../../../grpc/idl/clickhouseServiceIDL/datasource/datasource.proto';

@Module({
  controllers: [DataSourceController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SOURCE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: CLICKHOUSE_JAVA_DATASOURCE_PACKAGE_NAME,
          protoPath: resolve(__dirname, protoPath),
        },
      },
    ]),
  ],
})
export class DataSourceModule {}
