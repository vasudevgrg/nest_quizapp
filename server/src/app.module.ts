import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './features/exam/exam.module';
import { QuestionModule } from './features/question/question.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) =>
    //     dataSourceOptions(configService),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'vasuDEV7?',
      database: 'quizapp',
      entities: ['dist/src/domain/**/*.js'],
      synchronize: true,
    }),
    UserModule,
    ExamModule,
    QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
