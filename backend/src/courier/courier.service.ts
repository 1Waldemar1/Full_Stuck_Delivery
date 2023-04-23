import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CourierDto } from './dto/courier.dto';
import { returnCourier } from './return-courier.object';


@Injectable()
export class CourierService {
  constructor(private prisma: PrismaService) { }

  async createCourier(dto: CourierDto) {
    return await this.prisma.courier.create({
      data: {
        ...dto
      }
    });
  }

  async getCouriers() {
    return await this.prisma.courier.findMany({
      select: returnCourier
    })
  }

  async byId(idCourier: number) {
    const courier = await this.prisma.courier.findUnique({
      where: {
        idCourier
      },
      select: {
        ...returnCourier
      }
    })

    if (!courier){
      throw new BadRequestException('Courier not found')
    }

    return courier
  }

  async updateCourier(idCourier: number, dto: CourierDto) {

    return this.prisma.courier.update({
      where: {
        idCourier
      },
      data: dto
    });
  }

  async deleteCourier(idCourier: number) {

    return this.prisma.courier.delete({
      where: {
        idCourier
      }
    });
  }
}
