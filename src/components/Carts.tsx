import { useState } from 'react';

interface Cart {
  id: string;
  buyer_id: string;
  products: string[];
}

export default function Carts() {
  const [carts, setCarts] = useState<Cart[]>([
    { 
      id: '1', 
      buyer_id: '2',
      products: ['Lombok Pottery', 'Balinese Wood Carving'], 
    },
    { 
      id: '2', 
      buyer_id: '4',
      products: ['Lombok Pottery', 'Balinese Wood Carving'], 
    }
  ]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Delete this cart?')) {
      setCarts(carts.filter(cart => cart.id !== id));
    }
  };

  // Filter orders based on search
  const filteredCarts = carts.filter(cart => 
    cart.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cart.buyer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cart.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format price to IDR
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat('id-ID', {
  //     style: 'currency',
  //     currency: 'IDR',
  //     minimumFractionDigits: 0
  //   }).format(price);
  // };

  // Format date
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return new Intl.DateTimeFormat('id-ID', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   }).format(date);
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carts</h1>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search carts..."
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
            <th className="py-2 px-4 text-left">Products</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCarts.map((cart) => (
            <tr key={cart.id} className="border-b">
              <td className="py-2 px-4 font-medium">{cart.id}</td>
              <td className="py-2 px-4 font-medium">{cart.buyer_id}</td>
              <td className="py-2 px-4">
                <ul className="list-disc ml-4">
                  {cart.products.map((product, index) => (
                    <li key={index} className="text-sm">{product}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4">
                <button 
                  onClick={() => handleDelete(cart.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredCarts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No carts found matching your search
        </div>
      )}
    </div>
  );
}