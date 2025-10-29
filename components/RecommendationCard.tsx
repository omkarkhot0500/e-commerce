import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface RecommendationCardProps {
  product: Product;
}

// This is a Server Component - it renders on the server
export default function RecommendationCard({ product }: RecommendationCardProps) {
  const isLowStock = product.inventory < 10;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Low Stock Badge */}
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}

        {/* Recommendation Badge */}
        <div className="absolute top-2 left-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
          Recommended
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm text-gray-500 ml-2">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-sm ${isLowStock ? 'text-red-600' : 'text-gray-500'}`}>
            {product.inventory} in stock
          </span>
        </div>
        
        <div className="space-y-2">
          <Link
            href={`/products/${product.slug}`}
            className="btn-primary w-full text-center block"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
}
