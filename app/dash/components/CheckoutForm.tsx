"use client";
import { Product } from "@/lib/models/product";
import Order from "@/lib/models/checkout";

interface Props {
  products: Product[];
  onSubmit: (data: typeof Order) => void;
  isLoading: boolean;
}

export default function CheckoutForm({ products, onSubmit, isLoading }: Props) {
  // ... (نقل منطق نموذج الشراء)
}
