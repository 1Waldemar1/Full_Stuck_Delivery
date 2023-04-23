import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class OrderDto {

  @IsNumber()
  sum: number

  @IsString()
  address: string

  @IsDate()
  @Type(() => Date)
  order_creation_date: Date

  @IsNumber()
  idClient: number

  @IsNumber()
  idCourier: number
}