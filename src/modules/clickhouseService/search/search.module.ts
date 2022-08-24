import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SEARCH_SERVICE_NAME, SEARCH_PACKAGE_NAME } from './search.pb';
import { resolve } from 'path';

// when in debug mod, protoPath is relative to ${projectRoot}/dist/ because we use webpack for hmr
const pathMap = {
  debug: '../grpc/idl/clickhouseServiceIDL/search/search.proto',
  dev: '../../../../../grpc/idl/clickhouseServiceIDL/search/search.proto',
  production: '../grpc/idl/clickhouseServiceIDL/search/search.proto',
};

const protoPath =
  pathMap[process.env.NODE_ENV] ??
  '../grpc/idl/clickhouseServiceIDL/search/search.proto';

@Module({
  controllers: [SearchController],
  imports: [
    ClientsModule.register([
      {
        name: SEARCH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'bravoboom.tpddns.cn:50051',
          package: SEARCH_PACKAGE_NAME,
          protoPath: resolve(__dirname, protoPath),
        },
      },
    ]),
  ],
})
export class SearchModule {}
