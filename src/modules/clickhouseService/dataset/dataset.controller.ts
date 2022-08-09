import {
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
    const [err, res] = await to(firstValueFrom(this.svc.list(query)));
    if (err) {
      const customFields: Partial<DataSetList> = {
        createTime: Math.floor(getTime(faker.date.past()) / 1000).toString(),
        descr: faker.lorem.sentence(),
        dataSourceType: faker.helpers.arrayElement(['click_house']),
        dbName: faker.name.firstName(),
        schema: new Array(10).fill(null).map((_) => ({
          name: faker.name.firstName(),
          type: faker.helpers.arrayElement([
            'int',
            'string',
            'float',
            'bool',
            'date',
          ]),
          descr: faker.lorem.sentence(),
          isPartition: Math.random() > 0.5,
        })),
        id: faker.random.numeric(42),
        createUser: faker.name.lastName(),
      };

      Object.entries(customFields).forEach(([key, value], idx) => {
        generatorAdd<DataSetList>('DataSetList', key, value);
      });

      Object.entries({
        totalCount: Number(faker.random.numeric(2)),
        dataSetList: new Array(10).fill(null).map((_, idx) => {
          const data = generateMock<DataSetList>('DataSetList', 10, {
            id: faker.random.numeric(42) + idx,
          });
          return data;
        }),
      } as Partial<DataSetListResponseData>).forEach(([key, value]) => {
        generatorAdd<DataSetListResponseData>(
          'DataSetListResponseData',
          key,
          value,
        );
      });

      const mockData = generateMock<DataSetListResponse>(
        'DataSetListResponse',
        10,
        {
          baseResp: {
            code: 0,
            message: 'success',
          },
        },
      );

      // mock data, should delete it if interface is ready
      return of(
        new Promise((resolve) => {
          resolve(mockData);
        }),
      ) as any as Observable<DataSetListResponse>;

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Database microservice error occur when looking up for dataset: ${err}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return of(res);
  }
}
