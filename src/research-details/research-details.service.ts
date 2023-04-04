import { Injectable } from '@nestjs/common';
import { CreateResearchDetailDto } from './dto/create-research-detail.dto';
import { UpdateResearchDetailDto } from './dto/update-research-detail.dto';

@Injectable()
export class ResearchDetailsService {
  create(createResearchDetailDto: CreateResearchDetailDto, user: { email: string, sub: string }) {
    console.log({ user })
    console.log({ createResearchDetailDto })
    return 'This action adds a new researchDetail';
  }

  // findAll() {
  //   return `This action returns all researchDetails`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} researchDetail`;
  // }

  // update(id: number, updateResearchDetailDto: UpdateResearchDetailDto) {
  //   return `This action updates a #${id} researchDetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} researchDetail`;
  // }
}
