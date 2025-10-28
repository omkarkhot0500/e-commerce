import { NextRequest, NextResponse } from 'next/server';
import { Product, ApiResponse } from '@/lib/types';
import { findProductBySlug } from '@/lib/data';

// GET /api/products/[slug] - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const product: Product | null = findProductBySlug(slug);

    if (!product) {
      const response: ApiResponse<never> = {
        success: false,
        error: 'Product not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching product:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to fetch product',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
