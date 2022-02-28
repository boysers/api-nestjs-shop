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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    this.shopService.create(newProduct);
    return { message: 'produit créé' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: InterfaceProduct) {
    return this.shopService.update(id, product);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.shopService.delete(id);
  }
}
