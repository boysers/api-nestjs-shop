import { ObjectId } from 'mongoose';

export class CreateProductDto {
  readonly name: string;
  readonly category: ObjectId;
  readonly price: number;
  readonly status: boolean;
  readonly description: string;
}
