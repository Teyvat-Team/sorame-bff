import {
  CreateDatasetsRequest,
  CreateDatasetsResponse,
  DataSetClient,
  DataSetList,
  DataSetListRequest,
  DataSetListResponse,
  DataSetListResponseData,
} from './dataset.pb';
import {
  Controller,
  Inject,
  OnModuleInit,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';
import { DATA_SET_SERVICE_NAME } from './dataset.pb';
import { generateMock, generator, generatorAdd } from 'mockGen';
import { faker } from '@faker-js/faker';
import { getTime } from 'date-fns';

@Controller(`${baseurl}/dataset`)
export class DataSetController implements OnModuleInit {
  private svc: DataSetClient;

  @Inject(DATA_SET_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<DataSetClient>(DATA_SET_SERVICE_NAME);
  }

  @Get('list')
  async list(
    @Query() query: DataSetListRequest,
  ): Promise<Observable<DataSetListResponse>> {
    // const [err, res] = await to(firstValueFrom(this.svc.list(query)));
    // if (err) {
    // mock data, should delete it if interface is ready
    const mockData: DataSetListResponse = {
      baseResp: {
        code: 200,
        message: 'success',
      },
      data: new Array(10).fill(null).map((_, idx) => ({
        totalCount: 10,
        dataSetList: new Array(10).fill(null).map((_, idx) => {
          return {
            /** dataset createTime, timestamp in ms */
            createTime: Math.floor(
              getTime(faker.date.past()) / 1000,
            ).toString(),
            /** dataset name */
            name: faker.name.firstName() + ' 数据集',
            /** dataset description */
            descr: faker.lorem.sentence(),
            /** dataset source type */
            dataSourceType: faker.helpers.arrayElement(['click_house']),
            /** dataset id 数据集id */
            id: faker.random.numeric(42) + idx.toString(),
            /** dataset createUser */
            createUser: faker.name.lastName(),
            /** database name from where the table created */
            dbName: faker.name.jobArea(),
            /** table name */
            tableName: faker.name.middleName() + ' 表',
            /** table id */
            tableId: faker.random.numeric(32) + idx.toString(),
            /** table schema */
            schema: new Array(10).fill(null).map((_) => ({
              name: faker.name.prefix(),
              type: faker.helpers.arrayElement([
                'int',
                'string',
                'float',
                'bool',
                'date',
              ]),
              descr: faker.lorem.paragraph(),
              isPartition: Math.random() > 0.5,
            })),
          };
        }),
      })),
    };

    return of(
      new Promise((resolve) => {
        resolve(mockData);
      }),
    ) as any as Observable<DataSetListResponse>;

    // throw new HttpException(
    //   {
    //     status: HttpStatus.INTERNAL_SERVER_ERROR,
    //     error: `Database microservice error occur when looking up for dataset: ${err}`,
    //   },
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
    // }
    // return of(res);
  }

  @Post('create')
  async create(
    @Body() params: CreateDatasetsRequest,
  ): Promise<Observable<CreateDatasetsResponse>> {
    // const [err, res] = await to(firstValueFrom(this.svc.create(params)));
    // if (err) {
    // mock data, should delete it if interface is ready
    console.log('%c params >>>', 'background: yellow; color: blue', params);

    return of(
      new Promise((resolve) => {
        resolve({
          baseResp: {
            code: 200,
            message: 'success',
          },
          data: {
            id: faker.random.numeric(23),
          },
        } as CreateDatasetsResponse);
      }),
    ) as any as Observable<CreateDatasetsResponse>;

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

  @Delete('delete')
  async delete(
    @Query() params: CreateDatasetsRequest,
  ): Promise<Observable<CreateDatasetsResponse>> {
    // const [err, res] = await to(firstValueFrom(this.svc.create(params)));
    // if (err) {
    // mock data, should delete it if interface is ready
    console.log('%c params >>>', 'background: yellow; color: blue', params);

    return of(
      new Promise((resolve) => {
        resolve({} as CreateDatasetsResponse);
      }),
    ) as any as Observable<CreateDatasetsResponse>;

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
