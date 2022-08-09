/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { BaseResp } from '../base.pb';
import { Observable } from 'rxjs';

export const protobufPackage = 'clickhouse.java.dataset';

export enum OrderBy {
  createTime = 0,
  UNRECOGNIZED = -1,
}

export enum Order {
  asc = 0,
  desc = 1,
  UNRECOGNIZED = -1,
}

export interface DataSetListRequest {
  createUser: string;
  /** @default = createTime */
  orderBy?: OrderBy | undefined;
  /** @default = desc */
  order?: Order | undefined;
  /** when page and pageSize are not set, it will return all data sets */
  page?: number | undefined;
  pageSize?: number | undefined;
  /** filter for serarching dataset name */
  keyword?: string | undefined;
}

export interface DataSetListResponse {
  data: DataSetListResponseData[];
  baseResp: BaseResp | undefined;
}

export interface DataSetListResponseData {
  dataSetList: DataSetList[];
  totalCount: number;
}

export interface DataSetList {
  /** timestamp in ms */
  createTime: string;
  /** dataset name */
  name: string;
  /** dataset description */
  descr: string;
  /** dataset source type */
  dataSourceType: string;
  /** database name from where the dataset created */
  dbName: string;
  /** table name */
  tableName: string;
  /** table schema */
  schema: Schema[];
  /** dataset id */
  id: string;
  /** dataset createUser */
  createUser: string;
}

export interface Schema {
  name: string;
  type: string;
  descr: string;
  isPartition: boolean;
}

export const CLICKHOUSE_JAVA_DATASET_PACKAGE_NAME = 'clickhouse.java.dataset';

export interface DataSetClient {
  list(request: DataSetListRequest): Observable<DataSetListResponse>;
}

export interface DataSetController {
  list(
    request: DataSetListRequest,
  ):
    | Promise<DataSetListResponse>
    | Observable<DataSetListResponse>
    | DataSetListResponse;
}

export function DataSetControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['list'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('DataSet', method)(
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
      GrpcStreamMethod('DataSet', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const DATA_SET_SERVICE_NAME = 'DataSet';
