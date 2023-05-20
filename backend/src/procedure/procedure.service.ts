import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProcedureDto } from './dto/procedure.dto';
import { json } from 'stream/consumers';

@Injectable()
export class ProcedureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(procent: number) {
    console.log(procent);
    return await this.prisma.$executeRaw`call increase_prices(${procent})`;
  }
}
