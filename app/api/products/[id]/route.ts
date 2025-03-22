import { connectDB } from "@/lib/db";
import Product from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/products/[id]
export async function DELETE(
  // request: Request,
  request: NextRequest,
  { params }: { params: { id: string } } 
) {
  await connectDB();

  try {
const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  // request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
const { id } = await params;
    const body = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } } 
) {
  await connectDB();

  try {
const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    return NextResponse.json(
      { error: "Failed to get product" },
      { status: 500 }
    );
  }
}
