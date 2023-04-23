import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CourierService } from "./courier.service";
import { CourierDto } from './dto/courier.dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}
  
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CourierDto) {
    return this.courierService.createCourier(dto)  
  }

  @Get()
  async get() {
    return this.courierService.getCouriers()
  }

  @Get(':id')
  async getId(@Param('id') idCourier: string) {
    return this.courierService.byId(+idCourier)
  }

  @Put(':id')
  async update(@Param('id') idCourier: string, @Body() dto: CourierDto) {
    return this.courierService.updateCourier(+idCourier, dto)
  }

  @Delete(':id')
  async delete(@Param('id') idCourier: string) {
    return this.courierService.deleteCourier(+idCourier)
  }
}
