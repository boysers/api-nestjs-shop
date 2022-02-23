import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InterfaceProduct } from './interfaces/index.interface';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    return this.productModel.findOne({ _id: id }).exec();
  }

  async create(product: CreateProductDto) {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async update(id: string, product: InterfaceProduct) {
    return this.productModel.updateOne({ _id: id }, product).exec();
    /* const productToUpdate = this.products.find((product) => product.id === +id);
    if (!productToUpdate) {
      return new NotFoundException('Not Found update');
    }
    if (product.name) {
      productToUpdate.name = product.name;
    }
    if (product.price) {
      productToUpdate.price = product.price;
    }
    if (product.description) {
      productToUpdate.description = product.description;
    }
    const updatedProducts = this.products.map((product) =>
      product.id !== +id ? product : productToUpdate,
    );
    this.products = [...updatedProducts];
    return { product: productToUpdate }; */
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();

    /* const productToDelete = this.products.find((product) => product.id === +id);
    if (!productToDelete) {
      return new NotFoundException('Not Found delete');
    } else {
      this.products = [
        ...this.products.filter((product) => product.id !== +id),
      ];
      return { message: 'success delete' };
    } */
  }
}
