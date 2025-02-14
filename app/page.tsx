'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Download,
  Share2,
  ShoppingCart,
  Star,
  Check
} from "lucide-react";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">اسم المنشئ</h1>
          <Button variant="ghost">
            <Share2 className="w-4 h-4 ml-2" />
            مشاركة
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="معاينة المنتج"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">اسم المنتج</h1>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8 من 5)</span>
              </div>

              <p className="text-gray-600 text-lg">
                وصف تفصيلي للمنتج يشرح مميزاته وفوائده للمستخدم. يمكن أن يكون هذا النص طويلاً بما يكفي لشرح كل ما يحتاج المشتري معرفته.
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold">المنتج يتضمن:</h3>
                <ul className="space-y-2">
                  {[
                    "ملف PDF قابل للتحميل",
                    "فيديوهات تعليمية",
                    "دعم فني لمدة شهر",
                    "تحديثات مجانية"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 ml-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Left Column - Purchase Card */}
          <div>
            <Card className="p-6 sticky top-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">$49.99</span>
                  <Badge variant="secondary">عرض خاص</Badge>
                </div>

                <div className="space-y-4">
                  <Button className="w-full text-lg h-12" size="lg">
                    <ShoppingCart className="w-5 h-5 ml-2" />
                    شراء الآن
                  </Button>
                  
                  <Button variant="outline" className="w-full text-lg h-12" size="lg">
                    <Download className="w-5 h-5 ml-2" />
                    تحميل النسخة التجريبية
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">معلومات إضافية:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• تحديث آخر: 2024/1/1</li>
                    <li>• حجم الملف: 150 ميجابايت</li>
                    <li>• يتطلب: Windows 10 أو أحدث</li>
                    <li>• الترخيص: للاستخدام التجاري</li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>تم شراؤه 1,234 مرة</span>
                    <span>ضمان استرداد لمدة 30 يوم</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;