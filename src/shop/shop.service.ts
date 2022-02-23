import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InterfaceProduct } from './interfaces/index.interface';
// import { Product, ProductDocument } from './schemas/product.schema';
// import { Model } from 'mongoose';
import Product from './schemas/product.schema';

@Injectable()
export class ShopService {
  /* constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {} */

  async findAll() {
    return Product.find();
  }

  async findOne(id: any) {
    return Product.findOne({ _id: id }).exec();
  }

  async create(product: CreateProductDto) {
    const createdProduct = new Product({ ...product });
    return createdProduct.save();
  }

  async update(id: any, product: InterfaceProduct) {
    return Product.updateOne({ _id: id }, { ...product, _id: id }).exec();
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

  async delete(id: any) {
    return Product.deleteOne({ _id: id }).exec();

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
