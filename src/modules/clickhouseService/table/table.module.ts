import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TABLE_SERVICE_NAME, TABLE_PACKAGE_NAME } from './table.pb';
import { resolve } from 'path';

// when in debug mod, protoPath is relative to ${projectRoot}/dist/ because we use webpack for hmr
const pathMap = {
  debug: '../grpc/idl/clickhouseServiceIDL/table/table.proto',
  dev: '../../../../../grpc/idl/clickhouseServiceIDL/table/table.proto',
  production: '../grpc/idl/clickhouseServiceIDL/table/table.proto',
};

const protoPath =
  pathMap[process.env.NODE_ENV] ??
  '../grpc/idl/clickhouseServiceIDL/table/table.proto';

@Module({
  controllers: [TableController],
  imports: [
    ClientsModule.register([
      {
        name: TABLE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '123.11.3.202:50051',
          package: TABLE_PACKAGE_NAME,
          protoPath: resolve(__dirname, protoPath),
        },
      },
    ]),
  ],
})
export class TableModule {}
