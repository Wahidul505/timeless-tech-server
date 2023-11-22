import httpStatus from 'http-status';
import Stripe from 'stripe';
import ApiError from '../../../errors/ApiError';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const stripe = new Stripe(
  'sk_test_51MbbiGK3RZZOQUDyRQl4zzD9kSHU6weYV1wrxCkXxO94E4V5P8McJnOnGL1cXCaNf8TVouK23HMh97VwtbOlvX2700x2w8z7Qv'
);

const createOrder = async (payload: Partial<IOrder>): Promise<IOrder> => {
  const product = await Product.findById(payload.product);
  payload.price = product?.price;
  console.log(product);
  console.log(payload);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: (product?.price as number) * 100,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  if (!paymentIntent.client_secret) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to make payment');
  }

  payload.transactionId = paymentIntent.client_secret;

  const result = await Order.create(payload).then(order =>
    order.populate(['product', 'user'])
  );
  return result;
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id);
  return result;
};

export const OrderService = {
  createOrder,
  getSingleOrder,
};
