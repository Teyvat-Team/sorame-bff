import {
  DATA_SOURCE_SERVICE_NAME,
  ListRequest,
  ListResponse,
  DataSourceClient,
} from './datasource.pb';
import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  UseGuards,
  Req,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Request } from 'express';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';

@Controller(`${baseurl}/datasource`)
export class DataSourceController implements OnModuleInit {
  private svc: DataSourceClient;

  @Inject(DATA_SOURCE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<DataSourceClient>(
      DATA_SOURCE_SERVICE_NAME,
    );
  }

  @Get('list')
  async list(): Promise<Observable<ListResponse>> {
    const [err, res] = await to(firstValueFrom(this.svc.list({})));
    if (err) {
      // mock data, should delete it if interface is ready
      if (
        (
          err as any as {
            details?: string;
            [key: string]: unknown;
          }
        )?.details === 'No connection established'
      ) {
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
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to connect to java clickhouse service. Error Message: ${err}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return of(res);
  }
}
