import {
  DataSourceServiceClient,
  DATA_SOURCE_SERVICE_NAME,
  ListResponse,
} from './datasource.pb';
import {
  Controller,
  Inject,
  OnModuleInit,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';

@Controller(`${baseurl}/datasource`)
export class DataSourceController implements OnModuleInit {
  private svc: DataSourceServiceClient;

  @Inject(DATA_SOURCE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<DataSourceServiceClient>(
      DATA_SOURCE_SERVICE_NAME,
    );
  }

  @Get('list')
  async list(): Promise<Observable<ListResponse>> {
    debugger;
    // const [err, res] = await to(firstValueFrom(this.svc.list({})));
    // if (err) {
    // mock data, should delete it if interface is ready
    return of(
      new Promise((resolve) => {
        resolve({
          data: [
            {
              dataSourceName: 'Clickhouse',
              dataSourceType: 'click_house',
            },
          ],
          baseResp: {
            code: 0,
            message: 'success',
          },
        } as ListResponse);
      }),
    ) as any as Observable<ListResponse>;

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
