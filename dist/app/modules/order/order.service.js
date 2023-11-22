"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const stripe_1 = __importDefault(require("stripe"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const stripe = new stripe_1.default('sk_test_51MbbiGK3RZZOQUDyRQl4zzD9kSHU6weYV1wrxCkXxO94E4V5P8McJnOnGL1cXCaNf8TVouK23HMh97VwtbOlvX2700x2w8z7Qv');
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(payload.product);
    payload.price = product === null || product === void 0 ? void 0 : product.price;
    console.log(product);
    console.log(payload);
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: (product === null || product === void 0 ? void 0 : product.price) * 100,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    if (!paymentIntent.client_secret) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to make payment');
    }
    payload.transactionId = paymentIntent.client_secret;
    const result = yield order_model_1.Order.create(payload).then(order => order.populate(['product', 'user']));
    return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id);
    return result;
});
exports.OrderService = {
    createOrder,
    getSingleOrder,
};
