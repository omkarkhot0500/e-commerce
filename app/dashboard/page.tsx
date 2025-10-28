import { DashboardStats } from '@/lib/types';
import { readAllProducts } from '@/lib/data';
import ProductTable from '@/components/ProductTable';

// This page uses Server-Side Rendering (SSR)
// Data is fetched fresh on every request
async function getDashboardData(): Promise<{
  stats: DashboardStats;
  products: any[];
}> {
  let stats: DashboardStats;
  let products: any[] = [];

  try {
    const sampleData = readAllProducts();
    const totalProducts = sampleData.length;
    const lowStockItems = sampleData.filter(p => p.inventory < 10).length;
    const totalValue = sampleData.reduce((sum, p) => sum + (p.price * p.inventory), 0);
    const categories = [...new Set(sampleData.map(p => p.category))];
    
    stats = {
      totalProducts,
      lowStockItems,
      totalValue,
      categories,
    };
    
    products = sampleData;
  } catch (error) {
    const fallback = readAllProducts();
    products = fallback;
    stats = {
      totalProducts: fallback.length,
      lowStockItems: fallback.filter(p => p.inventory < 10).length,
      totalValue: fallback.reduce((sum, p) => sum + (p.price * p.inventory), 0),
      categories: [...new Set(fallback.map(p => p.category))],
    };
  }

  return { stats, products };
}

export default async function DashboardPage() {
  const { stats, products } = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inventory Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time inventory management and analytics
        </p>
      </div>

      {/* Cleaner UI: removed explanatory box */}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.lowStockItems}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">${stats.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {stats.categories.map((category) => {
            const categoryCount = products.filter(p => p.category === category).length;
            return (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {category} ({categoryCount})
              </span>
            );
          })}
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Products</h3>
          <p className="text-sm text-gray-600 mt-1">
            Complete inventory overview with real-time data
          </p>
        </div>
        <ProductTable products={products} />
      </div>
    </div>
  );
}
