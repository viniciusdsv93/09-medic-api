import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { AuthGuard } from './auth/auth.guard';
import { ResearchDetailsModule } from './research-details/research-details.module';
import { WebScrapingService } from './web-scraping/web-scraping.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { MailSenderService } from './mail-sender/mail-sender.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org', //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: {
          //dados do usuário e senha
          user: 'postmaster@sandbox92948a9a9f48423fbd41e13f306b6c55.mailgun.org',
          pass: 'ac4e25533401e47e448f1d43c84f0151-81bd92f8-00973d7d',
        },
        ignoreTLS: true,
      },
    }),
    UsersModule,
    AuthModule,
    ResearchDetailsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    PrismaService,
    WebScrapingService,
    MailSenderService,
  ],
})
export class AppModule {}
