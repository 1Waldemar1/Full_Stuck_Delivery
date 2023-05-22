import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { ProcedureDto } from './dto/procedure.dto';

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  async createProcedure(@Body() percent: ProcedureDto) {
    return this.procedureService.create(percent);
  }
}
