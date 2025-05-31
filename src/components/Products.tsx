import { useState } from 'react';

interface Product {
  id: string;
  sell_id: string;
  name: string;
  price: number;
  stock: number;
  region: string;
  category: string;
  status: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 'prod1', 
      sell_id: '3',
      name: 'Bali Coffee', 
      price: 75000, 
      stock: 50,
      region: 'Bali', 
      category: 'Beverage',
      status: 'available'
    },
    { 
      id: 'prod2', 
      sell_id: '1',
      name: 'Batik Shirt', 
      price: 250000, 
      stock: 15,
      region: 'Jawa Tengah', 
      category: 'Clothing',
      status: 'available'
    },
    { 
      id: 'prod3', 
      sell_id: '1',
      name: 'Lombok Pottery', 
      price: 120000, 
      stock: 8,
      region: 'NTB', 
      category: 'Handicraft',
      status: 'out of stock'
    }
  ]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      {/* Search bar */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Seller ID</th>
            <th className="py-2 px-4 text-left">Product</th>
            <th className="py-2 px-4 text-left">Price (IDR)</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-left">Region</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4 font-medium">{product.id}</td>
              <td className="py-2 px-4 font-medium">{product.sell_id}</td>
              <td className="py-2 px-4">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">{product.category}</div>
              </td>
              <td className="py-2 px-4">
                {new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(product.price)}
              </td>
              <td className="py-2 px-4">
                <span className={product.stock < 10 ? 'text-red-500 font-medium' : ''}>
                  {product.stock}
                </span>
              </td>
              <td className="py-2 px-4">{product.region}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded-full text-xs text-center ${
                  product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your search
        </div>
      )}
    </div>
  );
}