import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProcedureDto } from './dto/procedure.dto';

@Injectable()
export class ProcedureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(percent: ProcedureDto) {
    return await this.prisma
      .$executeRaw`call increase_prices(${percent.value})`;
  }
}
