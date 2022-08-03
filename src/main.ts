import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const kill = require('kill-port');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (module?.hot) {
    module.hot.accept?.();
    module.hot.dispose?.(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
