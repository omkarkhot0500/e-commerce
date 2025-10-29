import { NextRequest, NextResponse } from 'next/server';
import { Product, ApiResponse } from '@/lib/types';
import { readAllProducts, addProduct } from '@/lib/data';

// GET /api/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const products: Product[] = readAllProducts();

    const response: ApiResponse<Product[]> = {
      success: true,
      data: products,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to fetch products',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/products - Add new product (protected)
export async function POST(request: NextRequest) {
  try {
    // Auth disabled: allow POST in this demo deployment

    const body = await request.json();
    const { name, description, price, category, inventory, imageUrl } = body;

    // Validate required fields
    if (!name || !description || !price || !category || inventory === undefined) {
      const response: ApiResponse<never> = {
        success: false,
        error: 'Missing required fields',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      inventory: Number(inventory),
      imageUrl: imageUrl || '',
    };

    const response: ApiResponse<Product> = {
      success: true,
      data: addProduct({ ...productData, slug }),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to add product',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
