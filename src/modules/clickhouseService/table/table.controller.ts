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
} from './table.pb';
import { Controller, Inject, OnModuleInit, Get, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';
import { faker } from '@faker-js/faker';

@Controller(`${baseurl}/table`)
export class TableController implements OnModuleInit {
  private svc: TableClient;

  @Inject(TABLE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<TableClient>(TABLE_SERVICE_NAME);
  }

  @Get('list')
  async query(): Promise<Observable<TableResponse>> {
    // const [err, res] = await to(firstValueFrom(this.svc.list({})));
    // if (err) {
    // mock data, should delete it if interface is ready
    return of(
      new Promise((resolve) => {
        resolve({
          baseResp: {
            code: 200,
            message: 'success',
          },
          data: new Array<TableList>(10).fill(null).map((_, dbIdx) => {
            return {
              dbName: `db_${dbIdx}_${faker.name.firstName()}`,
              dbTable: new Array<DBTable>(10).fill(null).map((_, tbIdx) => {
                return {
                  tableName: `db_${dbIdx}_${faker.name.firstName()}.table_${tbIdx}_${faker.name.middleName()}`,
                  tableId: `db_${dbIdx}_${faker.name.firstName()}.table_${tbIdx}_${faker.name.lastName()}`,
                };
              }) as DBTable[],
            };
          }),
        } as TableResponse);
      }),
    ) as any as Observable<TableResponse>;

    // throw new HttpException(
    //   {
    //     status: HttpStatus.INTERNAL_SERVER_ERROR,
    //     error: `Failed to connect to java clickhouse service. Error Message: ${err}`,
    //   },
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
    // }
    // return of(res);
  }

  @Get('schema')
  async schema(
    @Query() query: TableSchemaRequest,
  ): Promise<Observable<TableSchemaResponse>> {
    debugger;
    // const [err, res] = await to(firstValueFrom(this.svc.list({})));
    // if (err) {
    // mock data, should delete it if interface is ready
    return of(
      new Promise((resolve) => {
        resolve({
          baseResp: {
            code: 200,
            message: 'success',
          },
          schema: new Array<Schema>(5).fill(null).map((_, schemaIdx) => {
            return {
              name: `schema_${schemaIdx}_${faker.name.firstName()}`,
              type: `type_${schemaIdx}_${faker.name.middleName()}`,
              descr: `descr_${schemaIdx}_${faker.lorem.paragraph()}`,
              isPartition: Math.random() > 0.5,
            };
          }),
        } as TableSchemaResponse);
      }),
    ) as any as Observable<TableSchemaResponse>;

    // throw new HttpException(
    //   {
    //     status: HttpStatus.INTERNAL_SERVER_ERROR,
    //     error: `Failed to connect to java clickhouse service. Error Message: ${err}`,
    //   },
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
    // }
    // return of(res);
  }
}
