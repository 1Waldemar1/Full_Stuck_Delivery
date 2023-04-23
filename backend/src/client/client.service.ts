import { Injectable, BadRequestException } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { PrismaService } from 'src/prisma.service';
import { returnClient } from './return-client.object';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(dto: ClientDto) {
    return await this.prisma.client.create({
      data: {
        ...dto
      }
    })
  }

  async getClients() {
    return await this.prisma.client.findMany({
      select: returnClient
    })
  }

  async byId(idClient: number) {
    const client = await this.prisma.client.findUnique({
      where: {
        idClient
      },
      select: {
        ...returnClient
      }
    })

    if (!client){
      throw new BadRequestException('Client not found')
    }

    return client
  }

  async updateClient(idClient: number, dto: ClientDto) {
   
    return this.prisma.client.update({
      where: {
        idClient
      },
      data: dto
    })
  }

  async deleteClient(idClient: number) {
    
    return this.prisma.client.delete({
      where: {
        idClient
      }
    })
  }
}
