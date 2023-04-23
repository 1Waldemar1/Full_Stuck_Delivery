import { Module } from '@nestjs/common';
import { ListOfProductsService } from './list_of_products.service';
import { ListOfProductsController } from './list_of_products.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ListOfProductsController],
  providers: [ListOfProductsService, PrismaService]
})
export class ListOfProductsModule {}
