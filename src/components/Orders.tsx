// src/components/Orders.tsx
import { useState, useEffect } from 'react';
import { ApiOrder } from '../interfaces/order';
import { fetchOrders } from '../services/orderService';

// Helper Functions (tidak ada perubahan)
const formatOrderDate = (dateInput: string | { _seconds: number, _nanoseconds: number }): string => {
    if (!dateInput) return 'N/A';
    const date = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput._seconds * 1000);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
};
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};
const getOrderStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('paid') || lowerStatus.includes('delivered')) return 'bg-green-100 text-green-800';
    if (lowerStatus.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    if (lowerStatus.includes('failed') || lowerStatus.includes('cancelled')) return 'bg-red-100 text-red-800';
    if (lowerStatus.includes('shipped') || lowerStatus.includes('processing')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
};

export default function Orders() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect kembali ke versi simpel dan efisien
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchOrders();
        setOrders(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  // Filter disesuaikan dengan data yang baru dan lebih lengkap
  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase();
    const buyerName = order.buyerInfo?.username?.toLowerCase() ?? '';
    const productNames = order.itemsSummary?.productNames?.join(' ').toLowerCase() ?? '';

    return (
      (order.id.toLowerCase().includes(term)) ||
      (order.buyer_id.toLowerCase().includes(term)) ||
      (buyerName.includes(term)) ||
      (productNames.includes(term))
    );
  });

  const handleDelete = async (id: string) => {
    alert('Fungsi delete belum diimplementasikan.');
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID, Buyer Name, Product Name..."
          className="border rounded px-3 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Buyer</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Products</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Shipping Address</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order Date</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700 break-all" title={order.id}>{order.id.substring(0, 8)}...</td>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">{order.buyerInfo?.username ?? order.buyer_id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <ul className="list-disc ml-4">
                    {order.itemsSummary?.productNames.map((name, index) => (
                      <li key={index} className="text-xs">{name}</li>
                    ))}
                  </ul>
                  <span className="text-xs text-gray-500">({order.itemsSummary?.totalItems} items)</span>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatPrice(order.total_amount)}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(order.order_status)}`}>
                    {order.order_status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{order.shipping_address}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{formatOrderDate(order.created_at)}</td>
                <td className="py-3 px-4 text-sm">
                  <button onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">No orders found.</div>
      )}
    </div>
  );
}