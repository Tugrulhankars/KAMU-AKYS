import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getUsers();
      setUsers(response);
    } catch (error) {
      toast.error('Kullanıcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
        <Link to="/users/new">
          <Button>Yeni Kullanıcı Ekle</Button>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {user.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">E-posta:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rol:</span>
                <span className="text-gray-900">{user.userType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kayıt Sayısı:</span>
                <span className="text-gray-900">{user.registrationCount}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/users/${user.id}`} className="flex-1">
                <Button variant="outline" className="w-full">Detay</Button>
              </Link>
              <Link to={`/users/${user.id}/edit`}>
                <Button variant="outline">Düzenle</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Kullanıcı bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default Users; 