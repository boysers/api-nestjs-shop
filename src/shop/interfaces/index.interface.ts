import { ObjectId } from 'mongoose';

export interface InterfaceProduct {
  name: string;
  category: ObjectId;
  price: number;
  status: boolean;
  description: string;
}
