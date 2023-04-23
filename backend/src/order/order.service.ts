import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './dto/order.dto';
import { returnOrder } from './return-order.object';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: OrderDto)
  {
    return this.prisma.order.create({
      data: {
        ...dto
      }
    })
  }

  async getOrders() {
    return await this.prisma.order.findMany({
      select: returnOrder
    })
  }

  async byId(idOrder: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        idOrder
      },
      select: {
        ...returnOrder
      }
    })

    if (!order){
      throw new BadRequestException('Order not found')
    }

    return order
  }

  async updateOrder(idOrder: number, dto: OrderDto) {

    return this.prisma.order.update({
      where: {
        idOrder: idOrder,
      },
      data: dto
    })
  }

  async deleteOrder(idOrder: number) {

    return this.prisma.order.delete({
      where: {
        idOrder: idOrder,
      }
    })
  }
}
