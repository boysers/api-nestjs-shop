import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InterfaceProduct } from './interfaces/index.interface';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll() {
    const listCategory = await this.categoryService.findAllStatus('true');

    const category = listCategory.map(({ _id }) => _id);

    return this.productModel.find({ $or: [{ category }] }).exec();
  }

  async findOne(id: string) {
    return this.productModel.findOne({ _id: id, status: true }).exec();
  }

  async create(product: CreateProductDto) {
    const createdProduct = new this.productModel(product);
    createdProduct.save();
  }

  async update(id: string, product: InterfaceProduct) {
    return this.productModel.updateOne({ _id: id }, product).exec();
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
