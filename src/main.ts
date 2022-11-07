import * as bodyParser from 'body-parser';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from '@core/logger/winston';
import { AppModule } from './app.module';
import { ExceptionFilter } from '@core/exceptions';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from '@core/utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use('/', (req, res, next) => {
    req.startTime = new Date();
    logger.info(`| ${req.method} | ${req.url}`);

    next();
  });

  app.use((req, res, next) => {
    res.on('finish', () => {
      const endTime = new Date();
      const responseTime = endTime.getTime() - req.startTime.getTime();

      logger.info(`| ${req.method} | ${req.originalUrl} ${res.statusCode} ${responseTime}ms`);
    });
    next();
  });

  // filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  if (configService.get('app.maintenance') === 1) {
    app.use((req, res) =>
      res.status(503).send({
        message: "Sorry for the inconvenience but we're performing some maintenance at the moment. We'll be back online shortly!",
      }),
    );
  }

  await app.listen(configService.get('app.port'));

  return `Server ${configService.get('app.name')} listening on ${configService.get('app.host')}:${configService.get(
    'app.port',
  )} IN ${configService.get('app.env')} mode`;
}

bootstrap().then((r) => logger.info(r));
