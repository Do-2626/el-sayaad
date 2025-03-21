"use client";

import React, { useState, useEffect } from "react";
// import type { Product } from "@/lib/models/product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}
const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();


  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/products");
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);
  const handleCheckout = (product: Product) => {
    if (!product._id) {
      console.error('Product ID is missing');
      return;
    }
    router.push(`/products/${product._id}/checkout`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">جميع المنتجات</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="block"
            >
              <Card className="p-4">
                <Image
                  src={product.image}
                  alt={`صورة ${product.name}`}
                  width={384}
                  height={192}
                  quality={50} // تقليل الجودة إلى 75%
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  priority={product._id === products[0]._id}
                />
                <h2 className="text-xl font-bold">
                  {product.name.substring(0, 40) + "..."}
                </h2>
                <div className="flex items-center space-x-2 space-x-reverse my-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.rating})
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {product.description.substring(0, 70) + "..."}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{product.price}</span>
             

                  <Button className="text-sm" onClick={() => handleCheckout(product)}>
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    شراء
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
