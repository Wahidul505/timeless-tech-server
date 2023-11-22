/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IProduct = {
  title: string;
  image: string;
  price: number;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
