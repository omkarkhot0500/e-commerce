import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, DashboardStats } from '@/lib/types';
import { readAllProducts } from '@/lib/data';

// GET /api/dashboard - Fetch dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const products = readAllProducts();
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.inventory < 10).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.inventory), 0);
    const categories = [...new Set(products.map(p => p.category))];

    const stats: DashboardStats = {
      totalProducts,
      lowStockItems,
      totalValue,
      categories,
    };

    const response: ApiResponse<DashboardStats> = {
      success: true,
      data: stats,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to fetch dashboard statistics',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
