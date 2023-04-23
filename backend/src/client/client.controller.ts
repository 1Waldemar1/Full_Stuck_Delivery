import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ClientDto) {
    return this.clientService.createClient(dto)
  }

  @Get()
  async get() {
    return this.clientService.getClients()
  }

  @Get(':id')
  async getId(@Param('id') idClient: string) {
    return this.clientService.byId(+idClient)
  }

  @Put(':id')
  async update(@Param('id') idClient: string, @Body() dto: ClientDto) {
    return this.clientService.updateClient(+idClient, dto)
  }

  @Delete(':id')
  async delete(@Param('id') idClient: string) {
    return this.clientService.deleteClient(+idClient)
  }
}
