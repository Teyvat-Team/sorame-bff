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
  offset: number;
  limit: number;
}

export interface SearchInterfaceResponse {
  cost: string;
  sql: string;
  table: Rows[];
  /** 从 0 开始的偏置值 */
  offset: number;
  limit: number;
  total: number;
  baseResp: BaseResp | undefined;
}

export interface SelectList {
  function: string;
  field: string;
}

export interface Rows {
  row: RowItem[];
}

export interface Sort {
  field: string;
  order: string;
}

export interface RowItem {
  key: string;
  value: string;
}

export const SEARCH_PACKAGE_NAME = 'search';

export interface SearchServiceClient {
  query(request: SearchInterfaceRequest): Observable<SearchInterfaceResponse>;
}

export interface SearchServiceController {
  query(
    request: SearchInterfaceRequest,
  ):
    | Promise<SearchInterfaceResponse>
    | Observable<SearchInterfaceResponse>
    | SearchInterfaceResponse;
}

export function SearchServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['query'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SearchService', method)(
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
      GrpcStreamMethod('SearchService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SEARCH_SERVICE_NAME = 'SearchService';
