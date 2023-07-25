import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    cors: {
      origin: [
        'https://64c012aa50d2b508e602a0d8--singular-cendol-baee26.netlify.app',
        // '',
        
      ],
    },
  })
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API for  social network')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Token',
    })
    .setVersion('1.0')
    // .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.register(compression, {
  //   encodings: ['gzip'],
  // });
  await app.listen(3000);
}
bootstrap();
