import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, DashboardStats } from '@/lib/types';
import { sampleProducts } from '@/lib/data';
import { getDashboardStatsFromDB } from '@/lib/mongodb';

// GET /api/dashboard - Fetch dashboard statistics
export async function GET(request: NextRequest) {
  try {
    let stats: DashboardStats;

    // Try to fetch from MongoDB first, fallback to sample data
    try {
      stats = await getDashboardStatsFromDB();
    } catch (error) {
      console.log('MongoDB not available, using sample data for stats');
      
      // Calculate stats from sample data
      const products = sampleProducts;
      const totalProducts = products.length;
      const lowStockItems = products.filter(p => p.inventory < 10).length;
      const totalValue = products.reduce((sum, p) => sum + (p.price * p.inventory), 0);
      const categories = [...new Set(products.map(p => p.category))];
      
      stats = {
        totalProducts,
        lowStockItems,
        totalValue,
        categories,
      };
    }

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
