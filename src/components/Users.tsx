import { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/userService';
import { UserWithId } from '../interfaces';

export default function Users() {
  const [users, setUsers] = useState<UserWithId[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone_number.includes(searchTerm)
  );

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Username</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Address</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4 font-medium">{user.id}</td>
              <td className="py-2 px-4 font-medium">{user.username}</td>
              <td className="py-2 px-4">
                <div>{user.email}</div>
                <div className="text-sm text-gray-500">{user.phone_number}</div>
              </td>
              <td className="py-2 px-4">{user.address}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === 'buyer' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="py-2 px-4">
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your search
        </div>
      )}
    </div>
  );
}
