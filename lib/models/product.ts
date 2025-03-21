import mongoose, { Schema, model, Model } from "mongoose";

interface IProduct {
  name: string;
  price: number;
  rating: number;
  description: string;
  features: string[];
  image: string;
  lastUpdate: string;
  fileSize: string;
  requirements: string;
  license: string;
  purchases: number;
  guarantee: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product extends IProduct {
  id: string;
}

// export type Product = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   image: string;
// };

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number },
  description: { type: String },
  features: { type: [String] },
  image: { type: String },
  lastUpdate: { type: String },
  fileSize: { type: String },
  requirements: { type: String },
  license: { type: String },
  purchases: { type: Number },
  guarantee: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product: Model<IProduct> =
  mongoose.models.Roro_T_Product ||
  model<IProduct>("Roro_T_Product", productSchema);

export default Product;
