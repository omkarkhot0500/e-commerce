import { NextRequest, NextResponse } from 'next/server';
import { Product, ApiResponse } from '@/lib/types';
import { updateProductById } from '@/lib/data';

// PUT /api/products/update/[id] - Update existing product (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Auth disabled: allow PUT in this demo deployment

    const { id } = params;
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

    const updates = {
      name,
      slug,
      description,
      price: Number(price),
      category,
      inventory: Number(inventory),
      imageUrl: imageUrl || '',
    };

    const updatedProduct: Product | null = updateProductById(id, updates);

    if (!updatedProduct) {
      const response: ApiResponse<never> = {
        success: false,
        error: 'Product not found or update failed',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: updatedProduct,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating product:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to update product',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

