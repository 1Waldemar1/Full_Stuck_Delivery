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
import { ListOfProductsService } from './list_of_products.service';
import { ListProductsDto } from './dto/list_of_products.dto';

@Controller('list-of-products')
export class ListOfProductsController {
  constructor(private readonly listOfProductsService: ListOfProductsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ListProductsDto) {
    return this.listOfProductsService.createListProducts(dto);
  }

  @Get()
  async get() {
    return this.listOfProductsService.getListsProducts();
  }

  @Get(':id')
  async getId(@Param('id') idList_of_products: string) {
    return this.listOfProductsService.byId(+idList_of_products);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') idListProducts: string,
    @Body() dto: ListProductsDto,
  ) {
    return this.listOfProductsService.updateListProducts(+idListProducts, dto);
  }

  @Delete(':id')
  async delete(@Param('id') idListProducts: string) {
    return this.listOfProductsService.deleteListProducts(+idListProducts);
  }
}
