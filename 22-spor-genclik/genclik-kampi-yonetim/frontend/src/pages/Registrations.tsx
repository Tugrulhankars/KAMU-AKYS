import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Registration } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Registrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await apiService.getRegistrations();
      setRegistrations(response);
    } catch (error) {
      toast.error('Kayıtlar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.participantName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-900">Kayıtlar</h1>
        <Link to="/registrations/new">
          <Button>Yeni Kayıt Ekle</Button>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Kamp veya katılımcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegistrations.map((reg) => (
          <Card key={reg.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{reg.campName}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                reg.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {reg.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Katılımcı:</span>
                <span className="text-gray-900">{reg.participantName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kayıt Tarihi:</span>
                <span className="text-gray-900">{new Date(reg.registrationDate).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Durum:</span>
                <span className="text-gray-900">{reg.status}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/registrations/${reg.id}`} className="flex-1">
                <Button variant="outline" className="w-full">Detay</Button>
              </Link>
              <Link to={`/registrations/${reg.id}/edit`}>
                <Button variant="outline">Düzenle</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      {filteredRegistrations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Kayıt bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default Registrations; 