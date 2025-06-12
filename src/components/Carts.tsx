import { useState, useEffect } from 'react';
import { ApiCartItem } from '../interfaces/cart';
import { fetchCartItems, deleteCartItem } from '../services/cartService';

const formatCartDate = (dateInput: string | { _seconds: number, _nanoseconds: number }): string => {
  if (typeof dateInput === 'string') {
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }
  } else if (dateInput && typeof dateInput._seconds === 'number') {
    const date = new Date(dateInput._seconds * 1000);
    return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }
  return 'Invalid date';
};

const formatCartPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export default function Carts() {
  const [cartItems, setCartItems] = useState<ApiCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchCartItems();
        setCartItems(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load cart items');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadCartItems();
  }, []);

  const handleDelete = async (cartItemId: string) => {
    if (confirm('Delete this cart item?')) {
      try {
        await deleteCartItem(cartItemId);
        setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
        alert('Cart item deleted successfully.');
      } catch (err: any) {
        alert('Failed to delete cart item: ' + (err.message || 'Unknown error'));
      }
    }
  };

  const filteredCartItems = cartItems.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cart_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-4 text-center">Loading cart items...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carts</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Item ID, Cart ID, Product ID..."
          className="border rounded px-3 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Item ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Cart ID (Buyer/User ID)</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price/Item</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total Price</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Added At</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCartItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700 break-all">{item.id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{item.cart_id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {item.product_id}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{item.quantity}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{formatCartPrice(item.price_per_item)}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatCartPrice(item.price_per_item * item.quantity)}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{formatCartDate(item.added_at)}</td>
                <td className="py-3 px-4 text-sm">
                  <button 
                    onClick={() => handleDelete(item.id)}
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
      
      {filteredCartItems.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No cart items found.
        </div>
      )}
    </div>
  );
}