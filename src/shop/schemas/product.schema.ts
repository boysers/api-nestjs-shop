import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: 'ObjectId' })
  category: ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  status: boolean;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
