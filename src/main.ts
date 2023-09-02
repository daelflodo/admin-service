import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// const PORT = 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Administrador API')
    .setDescription('Microservice Administrator')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const PORT = configService.get('PORT');

  app.enableCors({
    origin: '*', // URL permitida para las conexiones
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(PORT, '0.0.0.0', () => {
    console.log('Listening in port ' + PORT);
  });
}
bootstrap();

//*
// import { NestExpressApplication } from '@nestjs/platform-express'; // Cambia la importación
// import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { NestFactory } from '@nestjs/core/nest-factory';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule); // Cambia el tipo de aplicación
//   const configService = app.get(ConfigService);

//   const config = new DocumentBuilder()
//     .addBearerAuth()
//     .setTitle('Administrador API')
//     .setDescription('Microservice Administrator')
//     .setVersion('1.0')
//     .addTag('tasks')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('documentation', app, document);

//   const PORT = configService.get('PORT');

//   // Configura CORS para permitir conexiones desde http://localhost:3000
//   app.enableCors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Si tu aplicación utiliza cookies o autenticación basada en sesiones
//   });

//   await app.listen(PORT, '0.0.0.0', () => {
//     console.log('Listening in port ' + PORT);
//   });
// }

// bootstrap();
