import { useState } from 'react';

interface Order {
  id: string;
  buyer_id: string;
  customer: string;
  products: string[];
  total: number;
  payment_status: 'paid' | 'pending' | 'failed';
  delivery_status: 'processing' | 'shipped' | 'delivered';
  order_date: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-001', 
      buyer_id: '2',
      customer: 'Jane Smith', 
      products: ['Batik Shirt'], 
      total: 250000, 
      payment_status: 'pending',
      delivery_status: 'processing',
      order_date: '2024-04-17'
    },
    { 
      id: 'ORD-002', 
      buyer_id: '4',
      customer: 'Anita Wijaya', 
      products: ['Lombok Pottery', 'Balinese Wood Carving'], 
      total: 420000, 
      payment_status: 'paid',
      delivery_status: 'delivered',
      order_date: '2024-04-12'
    }
  ]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  // Filter orders based on search
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Get status color
  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="border rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Buyer ID</th>
            <th className="py-2 px-4 text-left">Customer</th>
            <th className="py-2 px-4 text-left">Products</th>
            <th className="py-2 px-4 text-left">Total</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Order Date</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-4 font-medium">{order.id}</td>
              <td className="py-2 px-4 font-medium">{order.buyer_id}</td>
              <td className="py-2 px-4">{order.customer}</td>
              <td className="py-2 px-4">
                <ul className="list-disc ml-4">
                  {order.products.map((product, index) => (
                    <li key={index} className="text-sm">{product}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 font-medium">{formatPrice(order.total)}</td>
              <td className="py-2 px-4">
                <div className="flex flex-col space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs text-center ${getPaymentStatusColor(order.payment_status)}`}>
                    {order.payment_status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs text-center ${getDeliveryStatusColor(order.delivery_status)}`}>
                    {order.delivery_status}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4">{formatDate(order.order_date)}</td>
              <td className="py-2 px-4">
                <button 
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No orders found matching your search
        </div>
      )}
    </div>
  );
}