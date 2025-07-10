import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

import { Camp } from '../types';

const Camps: React.FC = () => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await apiService.getCamps();
      setCamps(response);
    } catch (error) {
      toast.error('Kamplar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const filteredCamps = camps.filter(camp =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Pasif';
      case 'completed':
        return 'Tamamlandı';
      default:
        return 'Bilinmiyor';
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Kamplar</h1>
        <Link to="/camps/new">
          <Button>Yeni Kamp Ekle</Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Kamp ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <Card key={camp.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{camp.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(camp.status)}`}>
                {getStatusText(camp.status)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{camp.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Başlangıç:</span>
                <span className="text-gray-900">{new Date(camp.startDate).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Bitiş:</span>
                <span className="text-gray-900">{new Date(camp.endDate).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Konum:</span>
                <span className="text-gray-900">{camp.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Katılımcılar:</span>
                <span className="text-gray-900">{camp.registeredCount}/{camp.capacity}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to={`/camps/${camp.id}`} className="flex-1">
                <Button variant="outline" className="w-full">Detay</Button>
              </Link>
              <Link to={`/camps/${camp.id}/edit`}>
                <Button variant="outline">Düzenle</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredCamps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Kamp bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default Camps; 