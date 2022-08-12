/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { BaseResp } from '../base.pb';
import { Observable } from 'rxjs';

export const protobufPackage = 'search';

export interface SearchInterfaceRequest {
  datasetId: string;
  tableId: string;
  cache: boolean;
  selectList: SelectList[];
  whereCause: string;
  groupByList: string[];
  sort: Sort[];
}

export interface SearchInterfaceResponse {
  cost: string;
  sql: string;
  data: Table[];
  baseResp: BaseResp | undefined;
}

export interface SelectList {
  function: string;
  field: string;
}

export interface Table {
  row: Row[];
}

export interface Sort {
  field: string;
  order: string;
}

export interface Row {
  key: string;
  value: string;
}

export const SEARCH_PACKAGE_NAME = 'search';

/** 查询接口 */

export interface SearchClient {
  query(request: SearchInterfaceRequest): Observable<SearchInterfaceResponse>;
}

/** 查询接口 */

export interface SearchController {
  query(
    request: SearchInterfaceRequest,
  ):
    | Promise<SearchInterfaceResponse>
    | Observable<SearchInterfaceResponse>
    | SearchInterfaceResponse;
}

export function SearchControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['query'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Search', method)(
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
      GrpcStreamMethod('Search', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SEARCH_SERVICE_NAME = 'Search';
