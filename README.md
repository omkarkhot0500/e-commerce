# NextShop - Product Catalog & Admin Dashboard

A comprehensive Next.js 14 e-commerce application demonstrating different rendering methods (SSG, ISR, SSR, and CSR) with React Server Components.

## 🚀 Features

- **Static Site Generation (SSG)** - Home page with pre-rendered content
- **Incremental Static Regeneration (ISR)** - Product detail pages with revalidation
- **Server-Side Rendering (SSR)** - Real-time inventory dashboard
- **Client-Side Rendering (CSR)** - Interactive admin panel
- **React Server Components (RSC)** - Hybrid rendering for recommendations
- **JSON Datastore** - Simple file-based data storage (no database required)
- **TypeScript Support** - Full type safety
- **Tailwind CSS** - Modern, responsive design
- **API Routes** - RESTful API for product management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: JSON file (no external DB)
- **Authentication**: API key-based (for admin routes)

## 📁 Project Structure

```
nextshop/
├── app/                          # Next.js 14 App Router
│   ├── api/                     # API routes
│   │   ├── products/            # Product CRUD operations
│   │   └── dashboard/           # Dashboard statistics
│   ├── products/[slug]/         # Product detail pages (ISR)
│   ├── dashboard/               # Inventory dashboard (SSR)
│   ├── admin/                   # Admin panel (CSR)
│   ├── recommendations/         # Recommendations (RSC)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (SSG)
├── components/                   # React components
│   ├── Navigation.tsx           # Site navigation
│   ├── ProductCard.tsx          # Product display card
│   ├── ProductForm.tsx          # Product creation/editing
│   ├── SearchFilter.tsx         # Client-side search/filter
│   └── ...                      # Other components
├── lib/                         # Utility functions
│   ├── types.ts                 # TypeScript interfaces
│   ├── data.ts                  # Sample data
│   └── mongodb.ts               # Database integration
└── ...                          # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (optional)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # MongoDB Configuration (optional)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nextshop
   
   # Admin Authentication
   ADMIN_API_KEY=your-secret-admin-key-here
   
   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Rendering Strategies Explained

### 1. Static Site Generation (SSG) - Home Page
- **Location**: `/` (Home page)
- **When**: Build time
- **Benefits**: Fastest loading, great for SEO
- **Use Case**: Product catalog that doesn't change frequently

### 2. Incremental Static Regeneration (ISR) - Product Details
- **Location**: `/products/[slug]`
- **When**: Build time + revalidation every 60 seconds
- **Benefits**: Static performance with dynamic updates
- **Use Case**: Product pages with semi-dynamic content (prices, stock)

### 3. Server-Side Rendering (SSR) - Dashboard
- **Location**: `/dashboard`
- **When**: Every request
- **Benefits**: Always fresh data
- **Use Case**: Real-time inventory management

### 4. Client-Side Rendering (CSR) - Admin Panel
- **Location**: `/admin`
- **When**: Browser
- **Benefits**: Interactive, dynamic
- **Use Case**: Admin interfaces with complex interactions

### 5. React Server Components (RSC) - Recommendations
- **Location**: `/recommendations`
- **When**: Server + Client hybrid
- **Benefits**: Best of both worlds
- **Use Case**: Content that needs server data + client interactivity

## 🔧 API Endpoints

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/[slug]` - Fetch single product
- `POST /api/products` - Add new product (protected)
- `PUT /api/products/[id]` - Update product (protected)

### Dashboard
- `GET /api/dashboard` - Fetch dashboard statistics

### Authentication
Admin routes require the `x-api-key` header with a valid API key.

## 🗄️ Database Setup

### Data Storage (JSON)
The application uses a local JSON file at `data/products.json` for all reads/writes.
Note: On some serverless deployments, writing to the filesystem may not persist across requests.

## 🧪 Testing the Application

1. **Home Page (SSG)**: Visit `/` to see static generation
2. **Product Details (ISR)**: Click any product to see ISR in action
3. **Dashboard (SSR)**: Visit `/dashboard` for server-side rendering
4. **Admin Panel (CSR)**: Visit `/admin` and use API key: `your-secret-admin-key-here`
5. **Recommendations (RSC)**: Visit `/recommendations` for hybrid rendering

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ADMIN_API_KEY` | API key for admin routes | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |

## 🔍 Key Features Demonstrated

- **Performance Optimization**: Different rendering strategies for different use cases
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first Tailwind CSS
- **Database Integration**: MongoDB with graceful fallback
- **Authentication**: API key-based admin protection
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **SEO Optimization**: Proper meta tags and structured data

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Rendering Strategies](https://nextjs.org/docs/basic-features/pages#static-generation)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- MongoDB for database services
- Tailwind CSS for styling utilities
