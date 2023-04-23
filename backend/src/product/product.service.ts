import { PrismaService } from './../prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { returnProduct } from './return-product.object';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: ProductDto) {
    return await this.prisma.product.create({
      data: {
        ...dto
      }
    })
  }

  async getProducts() {
    return await this.prisma.product.findMany({
      select: returnProduct
    })
  }

  async byId(idProduct: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        idProduct
      },
      select: {
        ...returnProduct
      }
    })

    if (!product){
      throw new BadRequestException('Product not found')
    }

    return product
  }

  async updateProduct(idProduct: number, dto: ProductDto) {
   
    return this.prisma.product.update({
      where: {
        idProduct: idProduct
      },
      data: dto
    })
  }

  async deleteProduct(idProduct: number) {

    return this.prisma.product.delete({
      where: {
        idProduct
      }
    })
  }
}
