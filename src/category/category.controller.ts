import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InterfaceCategory } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create-product.dto';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllStatus(@Query('status') status?: string) {
    if (status) {
      try {
        return await this.categoryService.findAllStatus(status);
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    } else {
      return this.categoryService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  createCategory(@Body() newCategory: CreateCategoryDto) {
    this.categoryService.create(newCategory);
    return { message: 'Catégorie créée' };
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() category: InterfaceCategory) {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
