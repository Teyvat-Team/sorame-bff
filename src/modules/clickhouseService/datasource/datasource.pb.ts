/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { BaseResp } from '../base.pb';
import { Observable } from 'rxjs';

export const protobufPackage = 'datasource';

export interface ListRequest {}

export interface ListResponse {
  data: Data[];
  baseResp: BaseResp | undefined;
}

export interface Data {
  dataSourceName: string;
  dataSourceType: string;
}

export const DATASOURCE_PACKAGE_NAME = 'datasource';

export interface DataSourceServiceClient {
  list(request: ListRequest): Observable<ListResponse>;
}

export interface DataSourceServiceController {
  list(
    request: ListRequest,
  ): Promise<ListResponse> | Observable<ListResponse> | ListResponse;
}

export function DataSourceServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['list'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('DataSourceService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('DataSourceService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const DATA_SOURCE_SERVICE_NAME = 'DataSourceService';
