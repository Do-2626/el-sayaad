"use client";

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  productId: string;
}

const CheckoutPage = () => {
  const params = useParams(); // استخراج معلمات المسار
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    productId: params.id as string, // تعبئة الحقل تلقائيًا من المعلمة
  });

const router = useRouter();

useEffect(() => {
  console.log(window.location.href);
}, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("حدث خطأ أثناء معالجة الطلب");

      const data = await response.json();
      alert("تم إتمام الشراء بنجاح!");
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}> 
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            الاسم:
            <input
              type="text"
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            البريد الإلكتروني:
            <input
              type="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            رقم الهاتف:
            <input
              type="tel"
              name="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            العنوان:
            <input
              type="text"
              name="address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            رقم المنتج:
          <input
            type="text"
            name="productId"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100"
            value={formData.productId}
            onChange={handleInputChange}
            readOnly  
            required
          />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
        >
          شراء الآن
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
