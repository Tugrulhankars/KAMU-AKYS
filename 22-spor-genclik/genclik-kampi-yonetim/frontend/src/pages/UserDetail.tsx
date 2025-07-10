import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import toast from 'react-hot-toast';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await apiService.getUserById(id!);
      setUser(response);
    } catch (error) {
      toast.error('Kullanıcı detayları yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Kullanıcı bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
        <div className="flex gap-2">
          <Link to={`/users/${user.id}/edit`}>
            <Button variant="outline">Düzenle</Button>
          </Link>
          <Link to="/users">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900">E-posta</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Rol</h3>
              <p className="text-gray-600">{user.userType}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Durum</h3>
              <p className="text-gray-600">{user.isActive ? 'Aktif' : 'Pasif'}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Kayıt Sayısı</h3>
              <p className="text-gray-600">{user.registrationCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail; 