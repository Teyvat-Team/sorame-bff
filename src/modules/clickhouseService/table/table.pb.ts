/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { BaseResp } from '../base.pb';
import { Observable } from 'rxjs';

export const protobufPackage = 'table';

export interface TableRequest {
  /** 数据源名称（数据源名称需要唯一，否则需要一个id） */
  dataSourceName: string;
}

export interface TableResponse {
  data: TableList[];
  baseResp: BaseResp | undefined;
}

export interface TableList {
  dbName: string;
  dbTable: DBTable[];
}

export interface DBTable {
  tableName: string;
  tableId: string;
}

export interface TableSchemaRequest {
  /** 数据源名称 */
  dataSourceName: string;
  /** 数据库名称 */
  dbName: string;
  /** 表 id */
  tableId: string;
}

export interface TableSchemaResponse {
  /** 表名 */
  schema: Schema[];
  baseResp: BaseResp | undefined;
}

export interface Schema {
  name: string;
  type: string;
  descr: string;
  isPartition: boolean;
}

export interface DataTableInfoRequest {
  /** 数据集 id */
  datasetId: string;
  /** 数据表 id */
  dataTableId: string;
}

export interface DataTableInfoResponse {
  dimensionList: DimensionList[];
  metricList: MetricList[];
  functionList: FunctionList[];
  baseResp: BaseResp | undefined;
}

export interface DimensionList {
  name: string;
  type: string;
  descr: string;
  isPartition: boolean;
}

export interface MetricList {
  name: string;
  type: string;
  descr: string;
  isPartition: boolean;
}

export interface FunctionList {
  name: string;
  value: string;
}

export const TABLE_PACKAGE_NAME = 'table';

export interface TableClient {
  /** 数据源下的所有表 */

  list(request: TableRequest): Observable<TableResponse>;

  /** 表的 schema */

  schema(request: TableSchemaRequest): Observable<TableSchemaResponse>;

  /** 数据集中单个数据表信息 */

  info(request: DataTableInfoRequest): Observable<DataTableInfoResponse>;
}

export interface TableController {
  /** 数据源下的所有表 */

  list(
    request: TableRequest,
  ): Promise<TableResponse> | Observable<TableResponse> | TableResponse;

  /** 表的 schema */

  schema(
    request: TableSchemaRequest,
  ):
    | Promise<TableSchemaResponse>
    | Observable<TableSchemaResponse>
    | TableSchemaResponse;

  /** 数据集中单个数据表信息 */

  info(
    request: DataTableInfoRequest,
  ):
    | Promise<DataTableInfoResponse>
    | Observable<DataTableInfoResponse>
    | DataTableInfoResponse;
}

export function TableControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['list', 'schema', 'info'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Table', method)(
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
      GrpcStreamMethod('Table', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const TABLE_SERVICE_NAME = 'Table';
