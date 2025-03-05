import { connectDB } from "@/lib/db";
import Product from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

// واجهة برمجية للحصول على جميع المنتجات
// GET /api/products
export async function GET() {
  await connectDB();
  // ترتيب تصاعدى
  const sortedProducts = await Product.find().sort({ customerCode: 1 });
  return NextResponse.json(sortedProducts);
}

// واجهة برمجية لإضافة منتج جديد
// POST /api/products
export async function POST(request: NextRequest) {
  await connectDB();
  
  const body = await request.json();

  // التحقق من الحقول المطلوبة
  if (!body.name || !body.price) {
    return NextResponse.json(
      { error: "الاسم والسعر حقول مطلوبة" },
      { status: 400 }
    );
  }
  const newProduct = new Product(body);
  await newProduct.save();
  return NextResponse.json(newProduct);
}
