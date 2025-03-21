import mongoose, { Schema, model, Model } from "mongoose";
import { Product } from "./product";

interface ICheckout {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Checkout extends ICheckout {
  id: string;
}

const checkoutSchema = new Schema<ICheckout>({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Checkout: Model<ICheckout> =
  mongoose.models.Roro_T_Checkout ||
  model<ICheckout>("Roro_T_Checkout", checkoutSchema);

export default Checkout;
