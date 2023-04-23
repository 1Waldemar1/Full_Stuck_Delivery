import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';
import { ClientModule } from './client/client.module';
import { CourierModule } from './courier/courier.module';
import { ListOfProductsModule } from './list_of_products/list_of_products.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductModule, ClientModule, CourierModule, ListOfProductsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
