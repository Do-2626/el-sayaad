import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Checkout from "@/lib/models/checkout";
import Product from "@/lib/models/product";

// واجهة برمجية لجلب عملية الشراء
// GET /api/checkout
export async function GET() {
  await connectDB();
  // ترتيب تصاعدى
  const checkouts = await Checkout.find();
  return NextResponse.json(checkouts, { status: 200 });
}


// واجهة برمجية لإتمام عملية الشراء
// POST /api/checkout
export async function POST(request: Request) {
  await connectDB();
  
  const data = await request.json();
  console.log(data,"data")

  // Validate the data
  if (
    !data.name ||
    !data.email ||
    !data.phone ||
    !data.address ||
    !data.productId
  ) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    // Fetch the product details
    const product = await Product.findById(data.productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Create a new checkout entry
    const checkout = new Checkout({
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      quantity: data.quantity || 1,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      customerAddress: data.address,
    });

    // Save the checkout entry to the database
    await checkout.save();

    return NextResponse.json(
      { message: "Checkout successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during checkout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

