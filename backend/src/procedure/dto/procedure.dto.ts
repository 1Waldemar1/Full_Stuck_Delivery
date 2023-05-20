import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class ProcedureDto {
  @IsInt()
  procent: number;
}
