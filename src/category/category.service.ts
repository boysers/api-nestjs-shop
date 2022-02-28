import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-product.dto';
import { InterfaceCategory } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findAllStatus(status: string) {
    let boolValue: boolean;

    switch (status) {
      case 'false':
        boolValue = false;
        break;
      case 'true':
        boolValue = true;
        break;
      default:
        throw new Error('status={false or true}');
    }
    return this.categoryModel.find({ status: boolValue }).exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findOne({ _id: id }).exec();
  }

  async create(category: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(category);
    createdCategory.save();
  }

  async update(id: string, category: InterfaceCategory) {
    const categoryToUpdate = await this.categoryModel.findOne({ _id: id });

    if ('name' in category) {
      categoryToUpdate.name = category.name;
    }
    if ('status' in category) {
      categoryToUpdate.status = category.status;
    }

    return this.categoryModel.updateOne({ _id: id }, categoryToUpdate).exec();
  }

  async delete(id: string) {
    return this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
