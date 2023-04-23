import { IsNumber } from "class-validator";

export class ListProductsDto {

  @IsNumber()
  quantity: number
}