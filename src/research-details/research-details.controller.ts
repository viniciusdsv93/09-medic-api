import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ResearchDetailsService } from './research-details.service';
import { CreateResearchDetailDto } from './dto/create-research-detail.dto';
import { UpdateResearchDetailDto } from './dto/update-research-detail.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('research-details')
export class ResearchDetailsController {
  constructor(private readonly researchDetailsService: ResearchDetailsService) { }

  @Post()
  create(@Body() createResearchDetailDto: CreateResearchDetailDto, @Req() request: RequestWithUser) {
    console.log({ body: request.body })
    console.log({ createResearchDetailDto })
    const { user } = request;
    return this.researchDetailsService.create(createResearchDetailDto, user);
  }

  // @Get()
  // findAll() {
  //   return this.researchDetailsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.researchDetailsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateResearchDetailDto: UpdateResearchDetailDto) {
  //   return this.researchDetailsService.update(+id, updateResearchDetailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.researchDetailsService.remove(+id);
  // }
}
