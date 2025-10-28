import { Product } from './types';
import fs from 'fs';
import path from 'path';

// Path to JSON datastore
const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_JSON_PATH = path.join(DATA_DIR, 'products.json');

// Sample product data used to seed JSON on first run
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    inventory: 25,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
    price: 29.99,
    category: 'Clothing',
    inventory: 8,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS capabilities.',
    price: 299.99,
    category: 'Electronics',
    inventory: 15,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'Genuine leather crossbody bag perfect for everyday use.',
    price: 89.99,
    category: 'Accessories',
    inventory: 3,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  },
  {
    id: '5',
    name: 'Coffee Maker Pro',
    slug: 'coffee-maker-pro',
    description: 'Professional-grade coffee maker with programmable settings.',
    price: 149.99,
    category: 'Home & Kitchen',
    inventory: 12,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'
  },
  {
    id: '6',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Lightweight running shoes with excellent cushioning and support.',
    price: 129.99,
    category: 'Footwear',
    inventory: 20,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 39.99,
    category: 'Electronics',
    inventory: 30,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
  },
  {
    id: '8',
    name: 'Yoga Mat',
    slug: 'yoga-mat',
    description: 'Non-slip yoga mat with excellent grip and cushioning.',
    price: 49.99,
    category: 'Sports & Fitness',
    inventory: 18,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
  }
];

// Helper function to generate slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to get products by category
export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => product.category === category);
}

// Helper function to get low stock products (inventory < 10)
export function getLowStockProducts(products: Product[]): Product[] {
  return products.filter(product => product.inventory < 10);
}

// Ensure data directory and file exist; seed if necessary
function ensureDataStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_JSON_PATH)) {
    fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(sampleProducts, null, 2), 'utf-8');
  }
}

// Read all products from JSON
export function readAllProducts(): Product[] {
  ensureDataStore();
  const raw = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
  const data = JSON.parse(raw) as Product[];
  return data;
}

// Write all products to JSON
export function writeAllProducts(products: Product[]): void {
  ensureDataStore();
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

// Append a product
export function addProduct(product: Omit<Product, 'id' | 'lastUpdated' | 'slug'> & { slug?: string }): Product {
  const products = readAllProducts();
  const finalProduct: Product = {
    ...product,
    slug: product.slug ?? generateSlug(product.name),
    id: Date.now().toString(),
    lastUpdated: new Date().toISOString(),
  };
  products.push(finalProduct);
  writeAllProducts(products);
  return finalProduct;
}

// Update a product by id
export function updateProductById(id: string, updates: Partial<Product>): Product | null {
  const products = readAllProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  const current = products[index];
  const next: Product = {
    ...current,
    ...updates,
    slug: updates.name ? generateSlug(updates.name) : current.slug,
    lastUpdated: new Date().toISOString(),
  };
  products[index] = next;
  writeAllProducts(products);
  return next;
}

// Find by slug
export function findProductBySlug(slug: string): Product | null {
  const products = readAllProducts();
  return products.find(p => p.slug === slug) || null;
}
