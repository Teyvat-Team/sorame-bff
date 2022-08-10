/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { BaseResp } from '../base.pb';
import { Observable } from 'rxjs';

export const protobufPackage = 'dataset';

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
  /** 所有数据集 */
  data: DataSetListResponseData[];
  baseResp: BaseResp | undefined;
}

/** 单个数据集 */
export interface DataSetListResponseData {
  /** 一个数据集下的所有的表，数组长度为表的个数 */
  dataSetList: DataSetList[];
  /** 数据集总数 */
  totalCount: number;
}

/** 数据集下的单张表 */
export interface DataSetList {
  /** dataset createTime, timestamp in ms */
  createTime: string;
  /** dataset name */
  name: string;
  /** dataset description */
  descr: string;
  /** dataset source type */
  dataSourceType: string;
  /** dataset id 数据集id */
  id: string;
  /** dataset createUser */
  createUser: string;
  /** database name from where the table created */
  dbName: string;
  /** table name */
  tableName: string;
  /** table id */
  tableId: string;
  /** table schema */
  schema: Schema[];
}

export interface Schema {
  name: string;
  type: string;
  descr: string;
  isPartition: boolean;
}

export const DATASET_PACKAGE_NAME = 'dataset';

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
