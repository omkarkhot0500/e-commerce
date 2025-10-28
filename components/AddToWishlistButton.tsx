'use client';

import { useState } from 'react';

interface AddToWishlistButtonProps {
  productId: string;
}

// This is a Client Component - it handles user interactions
export default function AddToWishlistButton({ productId }: AddToWishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleWishlist = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsInWishlist(!isInWishlist);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
        isInWishlist
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
          {isInWishlist ? 'Removing...' : 'Adding...'}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <svg 
            className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} 
            fill={isInWishlist ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </div>
      )}
    </button>
  );
}
