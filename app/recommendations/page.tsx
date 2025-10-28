import { Product } from '@/lib/types';
import { sampleProducts } from '@/lib/data';
import RecommendationCard from '@/components/RecommendationCard';
import AddToWishlistButton from '@/components/AddToWishlistButton';

// This page uses React Server Components (RSC) for hybrid rendering
// Server components fetch data on the server, client components handle interactions
async function getRecommendedProducts(): Promise<Product[]> {
  // In a real app, you would implement recommendation logic
  // For demonstration, we'll return a subset of products
  const recommendations = sampleProducts
    .sort(() => Math.random() - 0.5) // Randomize for demo
    .slice(0, 6);
  
  return recommendations;
}

export default async function RecommendationsPage() {
  const recommendedProducts = await getRecommendedProducts();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Recommended for You
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover products we think you'll love based on your preferences and browsing history.
        </p>
      </div>

      {/* Cleaner UI: removed explanatory box */}

      {/* Server Component - Product Recommendations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Personalized Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <RecommendationCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Additional Server-Rendered Content */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Why These Recommendations?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Based on Your Interests</h4>
            <p className="text-gray-600 text-sm">
              We analyze your browsing patterns and preferences to suggest products 
              that match your style and needs.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Trending in Your Area</h4>
            <p className="text-gray-600 text-sm">
              These products are currently popular among customers with similar 
              preferences in your region.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Seasonal Picks</h4>
            <p className="text-gray-600 text-sm">
              Curated selections that are perfect for the current season and 
              upcoming trends.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Price Optimization</h4>
            <p className="text-gray-600 text-sm">
              We consider your budget preferences and show you the best value 
              options available.
            </p>
          </div>
        </div>
      </div>

      {/* Cleaner UI */}
    </div>
  );
}
