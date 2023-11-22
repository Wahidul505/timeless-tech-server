/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IProduct } from '../product/product.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
  name: string;
  phone: string;
  address: string;
  transactionId: string;
  price: number;
  product: Types.ObjectId | IProduct;
  user: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
