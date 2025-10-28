'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData, ApiResponse } from '@/lib/types';
import ProductForm from '@/components/ProductForm';
import AdminProductList from '@/components/AdminProductList';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('admin_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsAuthenticated(true);
      fetchProducts(storedApiKey);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProducts = async (key: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data: ApiResponse<Product[]> = await response.json();
      
      if (data.success && data.data) {
        setProducts(data.data);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    try {
      // Test the API key by making a request
      const response = await fetch('/api/products', {
        headers: {
          'x-api-key': apiKey,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_api_key', apiKey);
        fetchProducts(apiKey);
      } else {
        setError('Invalid API key');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setApiKey('');
    setProducts([]);
    localStorage.removeItem('admin_api_key');
  };

  const handleAddProduct = async (productData: ProductFormData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(productData),
      });

      const data: ApiResponse<Product> = await response.json();

      if (data.success && data.data) {
        setProducts(prev => [...prev, data.data!]);
        setShowForm(false);
        setError(null);
      } else {
        setError(data.error || 'Failed to add product');
      }
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleUpdateProduct = async (id: string, productData: ProductFormData) => {
    try {
      const response = await fetch(`/api/products/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(productData),
      });

      const data: ApiResponse<Product> = await response.json();

      if (data.success && data.data) {
        // Ensure list reflects updated data from server
        setProducts(prev => prev.map(p => (p.id === id ? data.data! : p)));
        setEditingProduct(null);
        setError(null);
      } else {
        setError(data.error || 'Failed to update product');
      }
    } catch (err) {
      setError('Failed to update product');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          
          {/* Cleaner UI: removed explanatory box */}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your admin API key"
                className="input-field"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
          
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-medium mb-2">Demo API Key:</p>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
              your-secret-admin-key-here
            </code>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Add Product
          </button>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProductForm
                onSubmit={handleAddProduct}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Product</h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProductForm
                product={editingProduct}
                onSubmit={(data) => handleUpdateProduct(editingProduct.id, data)}
                onCancel={() => setEditingProduct(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <AdminProductList
        products={products}
        onEdit={setEditingProduct}
      />
    </div>
  );
}
