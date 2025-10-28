import { Product } from '@/lib/types';
import { sampleProducts } from '@/lib/data';
import ProductGrid from '@/components/ProductGrid';
import SearchFilter from '@/components/SearchFilter';

// This page uses Static Site Generation (SSG)
// Data is fetched at build time for optimal performance
export default async function HomePage() {
  // In a real app, you might fetch from an API or database
  // For SSG demonstration, we're using sample data
  const products: Product[] = sampleProducts;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to NextShop
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing products with our advanced catalog system. 
          This page demonstrates <strong>Static Site Generation (SSG)</strong> - 
          content is pre-rendered at build time for maximum performance.
        </p>
      </div>

      {/* Removed explanatory box for cleaner UI */}

      {/* Search and Filter Component (Client-Side) */}
      <SearchFilter products={products} />

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
