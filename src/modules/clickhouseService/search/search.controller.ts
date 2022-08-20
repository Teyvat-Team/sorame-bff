import {
  SearchServiceClient,
  SearchInterfaceResponse,
  SEARCH_SERVICE_NAME,
  SearchInterfaceRequest,
} from './search.pb';
import {
  Controller,
  Inject,
  OnModuleInit,
  Get,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';
import { faker } from '@faker-js/faker';

@Controller(`${baseurl}/query`)
export class SearchController implements OnModuleInit {
  private svc: SearchServiceClient;

  @Inject(SEARCH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<SearchServiceClient>(SEARCH_SERVICE_NAME);
  }

  @Post()
  async query(
    @Body() query: { params: SearchInterfaceRequest },
  ): Promise<Observable<SearchInterfaceResponse>> {
    // const [err, res] = await to(firstValueFrom(this.svc.list(query)));
    // if (err) {
    // mock data, should delete it if interface is ready
    console.log('%c query >>>', 'background: yellow; color: blue', query);

    const { groupByList = [], selectList = [] } = query?.params ?? {};

    return of(
      new Promise((resolve) => {
        resolve({
          cost: '1000',
          sql: 'select * from test',
          table: new Array(8).fill(null).map((_, idx) => {
            return {
              row: [
                ...groupByList?.map?.((i) => {
                  return {
                    key: i,
                    value: faker.name.firstName(),
                  };
                }),
                ...selectList?.map((i) => {
                  return {
                    key: i.field,
                    value: faker.random.numeric(5),
                  };
                }),
              ],
            };
          }),
          baseResp: {
            code: 200,
            message: 'success',
          },
        } as SearchInterfaceResponse);
      }),
    ) as any as Observable<SearchInterfaceResponse>;

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
