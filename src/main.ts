import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/exception.filter';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra properties are found
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors( new ResponseInterceptor())

  process.env.NODE_ENV == 'development'
    ? await DevelopmentMode(app)
    : await ProductionMode(app);

  await app.listen(3000);
}

async function DevelopmentMode(app: INestApplication<any>) {
  console.log('Development mode');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Belinq API')
    .setDescription('The Main Api Documentation for Belinq.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
  //  app.useGlobalFilters(new AllExceptionsFilterDevelopment());
}

async function ProductionMode(app: INestApplication<any>) {
  console.log('Production mode');
  const whitelist = [
    'http://localhost:4200',
    'https://fastmoneytrade.com',
    'https://www.fastmoneytrade.com',
    'https://admin-control.fastmoneytrade.com',
  ];
  app.use(helmet({ hidePoweredBy: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '200mb' }));
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Belinq API')
  .setDescription('The Main Api Documentation for Belinq.')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, swaggerConfig);
SwaggerModule.setup('/api/docs', app, document);
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (!origin || whitelist.indexOf(origin) !== -1) {
  //       callback(null, origin);
  //     } else callback(new Error('Not allowed by CORS'));
  //   },

  //   credentials: true,
  // });

  // app.useGlobalFilters(new AllExceptionsFilterProduction());
}
bootstrap();
