import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  console.log(payload)
  const result = await Product.create(payload);
  return result;
};

const getProducts = async (): Promise<IProduct[]> => {
  const result = await Product.find();
  return result;
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);
  return result;
};

export const ProductService = {
  createProduct,
  getProducts,
  getSingleProduct,
};
