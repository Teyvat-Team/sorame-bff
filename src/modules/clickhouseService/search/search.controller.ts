import {
  SearchClient,
  SearchInterfaceResponse,
  SEARCH_SERVICE_NAME,
} from './search.pb';
import { Controller, Inject, OnModuleInit, Get } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import to from 'await-to-js';
import { baseurl } from 'src/const/const';

@Controller(`${baseurl}/query`)
export class SearchController implements OnModuleInit {
  private svc: SearchClient;

  @Inject(SEARCH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<SearchClient>(SEARCH_SERVICE_NAME);
  }

  @Get('query')
  async query(): Promise<Observable<SearchInterfaceResponse>> {
    debugger;
    // const [err, res] = await to(firstValueFrom(this.svc.list({})));
    // if (err) {
    // mock data, should delete it if interface is ready
    return of(
      new Promise((resolve) => {
        resolve({} as SearchInterfaceResponse);
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
