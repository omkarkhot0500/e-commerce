// Product model interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
  imageUrl?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Product form data for admin panel
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  imageUrl?: string;
}

// Dashboard statistics
export interface DashboardStats {
  totalProducts: number;
  lowStockItems: number;
  totalValue: number;
  categories: string[];
}
