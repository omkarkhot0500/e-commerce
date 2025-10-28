import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { sampleProducts } from '@/lib/data';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// This page uses Incremental Static Regeneration (ISR)
// Pages are pre-generated at build time and revalidated every 60 seconds
export const revalidate = 60; // Revalidate every 60 seconds

// Generate static params for all products at build time
export async function generateStaticParams() {
  // In a real app, you might fetch from an API or database
  // For ISR demonstration, we're using sample data
  return sampleProducts.map((product) => ({
    slug: product.slug,
  }));
}

// Fetch product data
async function getProduct(slug: string): Promise<Product | null> {
  // In a real app, you would fetch from your API or database
  // For ISR demonstration, we're using sample data
  const product = sampleProducts.find(p => p.slug === slug);
  return product || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const isLowStock = product.inventory < 10;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
          <li>/</li>
          <li><Link href="/" className="hover:text-gray-700">Products</Link></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      {/* Cleaner UI: removed explanatory box */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">
              {product.category}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isLowStock 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {isLowStock ? 'Low Stock' : 'In Stock'}
              </span>
              <span className="text-gray-600">
                {product.inventory} available
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Category:</span>
                <span className="ml-2 text-gray-900">{product.category}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">SKU:</span>
                <span className="ml-2 text-gray-900">{product.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Last Updated:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(product.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Availability:</span>
                <span className="ml-2 text-gray-900">
                  {product.inventory > 0 ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="btn-primary flex-1">
              Add to Cart
            </button>
            <button className="btn-secondary">
              Add to Wishlist
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
