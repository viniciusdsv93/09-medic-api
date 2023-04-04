import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResearchDetailDto } from './dto/create-research-detail.dto';
import { ResearchDetail } from './entities/research-detail.entity';

@Injectable()
export class ResearchDetailsService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(createResearchDetailDto: CreateResearchDetailDto, user: { email: string, sub: string }) {
    const id = randomUUID()

    const { term } = createResearchDetailDto
    const { sub } = user;
    const createdResearchDetail = await this.prismaService.researchDetails.create({
      data: {
        id,
        term,
        user: {
          connect: {
            id: sub
          }
        }
      }
    })
    return createdResearchDetail;
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
