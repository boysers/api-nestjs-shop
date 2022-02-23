import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InterfaceProduct } from './interfaces/index.interface';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    this.shopService.create(newProduct);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: InterfaceProduct) {
    return this.shopService.update(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.shopService.delete(id);
  }
}
