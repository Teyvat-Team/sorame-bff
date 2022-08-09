import { Module } from '@nestjs/common';
import { DataSetController } from './dataset.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  CLICKHOUSE_JAVA_DATASET_PACKAGE_NAME,
  DATA_SET_SERVICE_NAME,
} from './dataset.pb';
import { resolve } from 'path';

// when in debug mod, protoPath is relative to ${projectRoot}/dist/ because we use webpack for hmr
const pathMap = {
  debug: '../grpc/idl/clickhouseServiceIDL/dataset/dataset.proto',
  dev: '../../../../../grpc/idl/clickhouseServiceIDL/dataset/dataset.proto',
  production: '../grpc/idl/clickhouseServiceIDL/dataset/dataset.proto',
};

const protoPath =
  pathMap[process.env.NODE_ENV] ??
  '../grpc/idl/clickhouseServiceIDL/dataset/dataset.proto';

console.log(
  '%c resolve(__dirname, protoPath) >>>',
  'background: yellow; color: blue',
  resolve(__dirname, protoPath),
);

@Module({
  controllers: [DataSetController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SET_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: CLICKHOUSE_JAVA_DATASET_PACKAGE_NAME,
          protoPath: resolve(__dirname, protoPath),
        },
      },
    ]),
  ],
})
export class DataSetModule {}
