import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SkipAuth } from './common/skipAuth/skipAuth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('test')
  @SkipAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
