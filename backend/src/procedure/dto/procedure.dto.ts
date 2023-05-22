import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ProcedureDto {
  @IsNumber()
  @Type(() => Number)
  value: number;
}
