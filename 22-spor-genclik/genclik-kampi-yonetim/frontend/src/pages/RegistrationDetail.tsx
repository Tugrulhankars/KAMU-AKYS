import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Registration } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import toast from 'react-hot-toast';

const RegistrationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRegistration();
    }
  }, [id]);

  const fetchRegistration = async () => {
    try {
      const response = await apiService.getRegistrationById(parseInt(id!));
      setRegistration(response);
    } catch (error) {
      toast.error('Kayıt detayları yüklenirken hata oluştu');
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

  if (!registration) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Kayıt bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{registration.campName} - {registration.participantName}</h1>
        <div className="flex gap-2">
          <Link to={`/registrations/${registration.id}/edit`}>
            <Button variant="outline">Düzenle</Button>
          </Link>
          <Link to="/registrations">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Kayıt Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900">Kamp</h3>
              <p className="text-gray-600">{registration.campName}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Katılımcı</h3>
              <p className="text-gray-600">{registration.participantName}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Kayıt Tarihi</h3>
              <p className="text-gray-600">{new Date(registration.registrationDate).toLocaleDateString('tr-TR')}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Durum</h3>
              <p className="text-gray-600">{registration.status}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Ödeme Durumu</h3>
              <p className="text-gray-600">{registration.paymentStatus}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Tutar</h3>
              <p className="text-gray-600">{registration.amount} {registration.currency}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationDetail; 