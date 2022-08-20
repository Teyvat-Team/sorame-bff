import {
  TableClient,
  TableList,
  TableResponse,
  TABLE_SERVICE_NAME,
  DBTable,
  TableRequest,
  TableSchemaResponse,
  TableSchemaRequest,
  Schema,
  DataTableInfoRequest,
  DataTableInfoResponse,
} from './table.pb';
import {
  Controller,
  Inject,
  OnModuleInit,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';
import { faker } from '@faker-js/faker';
import { getTime } from 'date-fns';

@Controller(`${baseurl}/table`)
export class TableController implements OnModuleInit {
  private svc: TableClient;

  @Inject(TABLE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<TableClient>(TABLE_SERVICE_NAME);
  }

  @Get('list')
  async list(@Query() query: TableRequest): Promise<Observable<TableResponse>> {
    const [err, res] = await to(firstValueFrom(this.svc.list(query)));
    if (err) {
      // mock data, should delete it if interface is ready
      // return of(
      //   new Promise((resolve) => {
      //     resolve({
      //       baseResp: {
      //         code: 200,
      //         message: 'success',
      //       },
      //       data: new Array<TableList>(10).fill(null).map((_, dbIdx) => {
      //         return {
      //           dbName: `db_${dbIdx}_${faker.name.firstName()}`,
      //           dbTable: new Array<DBTable>(10).fill(null).map((_, tbIdx) => {
      //             return {
      //               tableName: `db_${dbIdx}_${faker.name.firstName()}.table_${tbIdx}_${faker.name.middleName()}`,
      //               tableId: `db_${dbIdx}_${faker.name.firstName()}.table_${tbIdx}_${faker.name.lastName()}`,
      //             };
      //           }) as DBTable[],
      //         };
      //       }),
      //     } as TableResponse);
      //   }),
      // ) as any as Observable<TableResponse>;

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to connect to java clickhouse service. Error Message: ${err}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return of(res);
  }

  @Get('schema')
  async schema(
    @Query() query: TableSchemaRequest,
  ): Promise<Observable<TableSchemaResponse>> {
    const [err, res] = await to(firstValueFrom(this.svc.schema(query)));
    if (err) {
      // mock data, should delete it if interface is ready
      // return of(
      //   new Promise((resolve) => {
      //     resolve({
      //       baseResp: {
      //         code: 200,
      //         message: 'success',
      //       },
      //       schema: new Array<Schema>(3).fill(null).map((_, schemaIdx) => {
      //         return {
      //           name: `schema_${schemaIdx}_${faker.name.firstName()}`,
      //           type: faker.helpers.arrayElement(['String', 'Int64', 'Int32']),
      //           descr: `descr_${schemaIdx}_${faker.lorem.paragraph()}`,
      //           isPartition: Math.random() > 0.5,
      //         };
      //       }),
      //     } as TableSchemaResponse);
      //   }),
      // ) as any as Observable<TableSchemaResponse>;

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to connect to java clickhouse service. Error Message: ${err}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return of(res);
  }

  @Get('info')
  async info(
    @Query() query: DataTableInfoRequest,
  ): Promise<Observable<DataTableInfoResponse>> {
    const [err, res] = await to(firstValueFrom(this.svc.info(query)));
    if (err) {
      // mock data, should delete it if interface is ready
      // return of(
      //   new Promise((resolve) => {
      //     resolve({
      //       baseResp: {
      //         code: 200,
      //         message: 'success',
      //       },
      //       /** dataset createTime, timestamp in ms */
      //       createTime: Math.floor(getTime(faker.date.past()) / 1000).toString(),
      //       /** dataset name */
      //       name: faker.name.firstName() + ' 数据集',
      //       /** dataset description */
      //       descr: faker.lorem.sentence(),
      //       /** dataset source type */
      //       dataSourceType: faker.helpers.arrayElement(['click_house']),
      //       /** dataset id 数据集id */
      //       id: faker.random.numeric(42),
      //       /** dataset createUser */
      //       createUser: faker.name.lastName(),
      //       /** database name from where the table created */
      //       dbName: faker.name.jobArea(),
      //       /** table name */
      //       tableName: faker.name.middleName() + ' 表',
      //       /** table id */
      //       tableId: faker.random.numeric(32),
      //       /** table schema */
      //       schema: new Array(3).fill(null).map((_) => ({
      //         name: faker.name.jobTitle(),
      //         type: faker.helpers.arrayElement([
      //           'int',
      //           'string',
      //           'float',
      //           'bool',
      //           'date',
      //         ]),
      //         descr: faker.lorem.paragraph(),
      //         isPartition: Math.random() > 0.5,
      //       })),
      //       dimensionList: new Array<string>(20)
      //         .fill(null)
      //         .map((_, dimensionIdx) => {
      //           return {
      //             name: `dimension_${dimensionIdx}_${faker.name.firstName()}`,
      //             type: `dimension_type_${dimensionIdx}_${faker.name.middleName()}`,
      //             descr: `dimension_descr_${dimensionIdx}_${faker.lorem.paragraph()}`,
      //             isPartition: Math.random() > 0.5,
      //           };
      //         }),
      //       metricList: new Array<string>(20).fill(null).map((_, metricIdx) => {
      //         return {
      //           name: `metric_${metricIdx}_${faker.name.firstName()}`,
      //           type: `metric_type_${metricIdx}_${faker.name.middleName()}`,
      //           descr: `metric_descr_${metricIdx}_${faker.lorem.paragraph()}`,
      //           isPartition: Math.random() > 0.5,
      //         };
      //       }),
      //       functionList: [
      //         {
      //           name: '求和',
      //           value: 'sum',
      //         },
      //         {
      //           name: '平均值',
      //           value: 'avg',
      //         },
      //         {
      //           name: '最大值',
      //           value: 'max',
      //         },
      //         {
      //           name: '最小值',
      //           value: 'min',
      //         },
      //         {
      //           name: '计数',
      //           value: 'count',
      //         },
      //         {
      //           name: 'topK',
      //           value: 'topK',
      //         },
      //         {
      //           name: '分位数',
      //           value: 'quantile',
      //         },
      //       ],
      //     } as DataTableInfoResponse);
      //   }),
      // ) as any as Observable<DataTableInfoResponse>;

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to connect to java clickhouse service. Error Message: ${err}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return of(res);
  }
}
