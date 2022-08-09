import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const kill = require('kill-port');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (module?.hot) {
    if (process.env.NODE_ENV === 'debug') {
      kill(3000);
    }
    module.hot.accept?.();
    module.hot.dispose?.(() => app.close());
  }

  await app.listen(3000);
  console.log('Listening on port 3000');
}
bootstrap();
