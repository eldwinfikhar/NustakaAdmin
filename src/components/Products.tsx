import { useState, useEffect } from 'react';
import { ApiProduct } from '../interfaces/product';
import { fetchProducts, searchProducts, deleteProduct } from '../services/productService';

const formatProductDate = (dateInput: string | { _seconds: number, _nanoseconds: number }): string => {
  if (typeof dateInput === 'string') {
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  } else if (dateInput && typeof dateInput._seconds === 'number') {
    const date = new Date(dateInput._seconds * 1000);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  return 'Invalid date';
};

export default function Products() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchTerm.trim() === '') {
          const response = await fetchProducts();
          setProducts(response.data);
        } else {
          const searchedProducts = await searchProducts(searchTerm);
          setProducts(searchedProducts);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      loadProducts();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        alert('Product deleted successfully');
      } catch (err: any) {
        alert('Failed to delete product: ' + (err.message || 'Unknown error'));
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search products by name, etc..."
          className="border rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Seller ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Region ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Created At</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700 break-all">{product.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">{product.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{product.seller_id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{formatPrice(product.price)}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <span className={product.stock < 10 ? 'text-red-500 font-medium' : ''}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.category_id}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.region_id}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === 'available' ? 'bg-green-100 text-green-800' :
                    product.status === 'out of stock' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{formatProductDate(product.created_at)}</td>
                <td className="py-3 px-4 text-sm">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
}