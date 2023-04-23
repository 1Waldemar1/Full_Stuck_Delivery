import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class ListProductsDto {

  @IsNumber()
  @Type(() => Number)
  quantity: number
}