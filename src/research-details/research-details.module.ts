import { Module } from '@nestjs/common';
import { ResearchDetailsService } from './research-details.service';
import { ResearchDetailsController } from './research-details.controller';

@Module({
  controllers: [ResearchDetailsController],
  providers: [ResearchDetailsService]
})
export class ResearchDetailsModule {}
