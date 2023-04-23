import { IsPhoneNumber, IsString } from "class-validator"

export class ClientDto {

  @IsString()
  full_name: string

  @IsString()
  address: string

  @IsPhoneNumber()
  phone: string
}