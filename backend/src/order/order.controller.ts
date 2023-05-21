import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: OrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Get()
  async get() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  async getId(@Param('id') idOrder: string) {
    return this.orderService.byId(+idOrder);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') idOrder: string, @Body() dto: OrderDto) {
    return this.orderService.updateOrder(+idOrder, dto);
  }

  @Delete(':id')
  async delete(@Param('id') idOrder: string) {
    return this.orderService.deleteOrder(+idOrder);
  }
}
