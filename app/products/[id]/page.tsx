"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Product } from "@/lib/models/product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={product.image}
              alt={`صورة ${product.name}`}
              width={768}
              height={384}
              quality={50}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center space-x-2 space-x-reverse my-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.rating})</span>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{product.price}</span>
              <Button className="text-sm" onClick={() => window.location.href = `/products/${id}/checkout`}>
                <ShoppingCart className="w-4 h-4 ml-2" />
                شراء
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
