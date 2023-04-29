import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  sum: number;

  @IsString()
  address: string;

  @IsDate()
  @Type(() => Date)
  order_creation_date: Date;

  @IsNumber()
  @Type(() => Number)
  idClient: number;

  @IsNumber()
  @Type(() => Number)
  idCourier: number;
}
