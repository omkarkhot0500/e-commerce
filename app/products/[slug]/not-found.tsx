import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
