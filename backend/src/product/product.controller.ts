import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto)
  }

  @Get()
  async get() {
    return this.productService.getProducts()
  }

  @Get(':id')
  async getId(@Param('id') idProduct: string) {
    return this.productService.byId(+idProduct)
  }

  @Put(':id')
  async update(@Param('id') idProduct: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(+idProduct, dto)
  }

  @Delete(':id')
  async delete(@Param('id') idProduct: string) {
    return this.productService.deleteProduct(+idProduct)
  }

}
