import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { Enviroments } from './enviroments';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './user/users.repository';
import { User } from './user/entities/user.entity';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: Enviroments[process.env.NODE_ENV] || 'env',
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        DB_PORT: joi.number().required(),
        DB_HOST: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),
      })
    }),
    UserModule,
    TaskModule,
    AuthModule,
    // TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
