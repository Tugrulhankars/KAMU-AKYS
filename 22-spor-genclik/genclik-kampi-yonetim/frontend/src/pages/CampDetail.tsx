import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Camp } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import toast from 'react-hot-toast';

const CampDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [camp, setCamp] = useState<Camp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCamp();
    }
  }, [id]);

  const fetchCamp = async () => {
    try {
      const response = await apiService.getCampById(parseInt(id!));
      setCamp(response);
    } catch (error) {
      toast.error('Kamp detayları yüklenirken hata oluştu');
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

  if (!camp) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Kamp bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{camp.name}</h1>
        <div className="flex gap-2">
          <Link to={`/camps/${camp.id}/edit`}>
            <Button variant="outline">Düzenle</Button>
          </Link>
          <Link to="/camps">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kamp Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Açıklama</h3>
                  <p className="text-gray-600 mt-1">{camp.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Başlangıç Tarihi</h3>
                    <p className="text-gray-600">{new Date(camp.startDate).toLocaleDateString('tr-TR')}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Bitiş Tarihi</h3>
                    <p className="text-gray-600">{new Date(camp.endDate).toLocaleDateString('tr-TR')}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Konum</h3>
                    <p className="text-gray-600">{camp.locationName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Kategori</h3>
                    <p className="text-gray-600">{camp.categoryName}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Katılım Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Kapasite</h3>
                  <p className="text-gray-600">{camp.capacity} kişi</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Kayıtlı Katılımcı</h3>
                  <p className="text-gray-600">{camp.registeredCount} kişi</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Boş Kontenjan</h3>
                  <p className="text-gray-600">{camp.availableSpots} kişi</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Yaş Aralığı</h3>
                  <p className="text-gray-600">{camp.minAge} - {camp.maxAge} yaş</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detaylar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Zorluk Seviyesi</h3>
                  <p className="text-gray-600">{camp.difficulty}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Gereksinimler</h3>
                  <p className="text-gray-600">{camp.requirements}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ekipman</h3>
                  <p className="text-gray-600">{camp.equipment}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Konaklama</h3>
                  <p className="text-gray-600">{camp.accommodation}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Yemek</h3>
                  <p className="text-gray-600">{camp.meals}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ulaşım</h3>
                  <p className="text-gray-600">{camp.transportation}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sigorta</h3>
                  <p className="text-gray-600">{camp.insurance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Durum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Durum:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    camp.status === 'active' ? 'bg-green-100 text-green-800' :
                    camp.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {camp.status === 'active' ? 'Aktif' :
                     camp.status === 'inactive' ? 'Pasif' : 'Tamamlandı'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kayıt Açık:</span>
                  <span className={camp.isRegistrationOpen ? 'text-green-600' : 'text-red-600'}>
                    {camp.isRegistrationOpen ? 'Evet' : 'Hayır'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiyat:</span>
                  <span className="font-medium">{camp.price} {camp.currency}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {camp.activities && camp.activities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Aktiviteler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {camp.activities.map((activity) => (
                    <div key={activity.id} className="p-2 bg-gray-50 rounded">
                      <h4 className="font-medium text-sm">{activity.name}</h4>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampDetail; 