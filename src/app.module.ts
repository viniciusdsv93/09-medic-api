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

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), UsersModule, AuthModule, ResearchDetailsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppService,
    PrismaService,
    WebScrapingService,
    MailSenderService,
  ],
})
export class AppModule { }
