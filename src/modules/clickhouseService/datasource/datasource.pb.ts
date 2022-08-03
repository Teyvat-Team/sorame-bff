/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { BaseResp } from '../base.pb';
import { Observable } from 'rxjs';

export const protobufPackage = 'clickhouse.java.datasource';

export interface ListRequest {}

export interface ListResponse {
  data: Data[];
  baseResp: BaseResp | undefined;
}

export interface Data {
  dataSourceName: string;
  dataSourceType: string;
}

export const CLICKHOUSE_JAVA_DATASOURCE_PACKAGE_NAME =
  'clickhouse.java.datasource';

export interface DataSourceClient {
  list(request: ListRequest): Observable<ListResponse>;
}

export interface DataSourceController {
  list(
    request: ListRequest,
  ): Promise<ListResponse> | Observable<ListResponse> | ListResponse;
}

export function DataSourceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['list'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('DataSource', method)(
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
      GrpcStreamMethod('DataSource', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const DATA_SOURCE_SERVICE_NAME = 'DataSource';
