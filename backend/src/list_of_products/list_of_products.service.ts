import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListProductsDto } from './dto/list_of_products.dto';
import { returnListOfProducts } from './return-list_of_products.object';

@Injectable()
export class ListOfProductsService {
  constructor(private prisma: PrismaService) {}

  async createListProducts(dto: ListProductsDto) {
    return this.prisma.list_of_products.create({
      data: {
        ...dto,
      },
    });
  }

  async getListsProducts() {
    return await this.prisma.list_of_products.findMany({
      select: returnListOfProducts,
    });
  }

  async byId(idList_of_products: number) {
    const list_products = await this.prisma.list_of_products.findUnique({
      where: {
        idList_of_products,
      },
      select: {
        ...returnListOfProducts,
      },
    });

    if (!list_products) {
      throw new BadRequestException('List of products not found');
    }

    return list_products;
  }

  async updateListProducts(idListProducts: number, dto: ListProductsDto) {
    return this.prisma.list_of_products.update({
      where: {
        idList_of_products: idListProducts,
      },
      data: dto,
    });
  }

  async deleteListProducts(idListProducts: number) {
    return this.prisma.list_of_products.delete({
      where: {
        idList_of_products: idListProducts,
      },
    });
  }
}
