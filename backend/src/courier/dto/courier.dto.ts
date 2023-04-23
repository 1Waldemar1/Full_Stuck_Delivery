import { IsPhoneNumber, IsString } from "class-validator"

export class CourierDto {

  @IsString()
  full_name: string

  @IsPhoneNumber()
  phone: string

}