import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import toast from 'react-hot-toast';

const ActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchActivity();
    }
  }, [id]);

  const fetchActivity = async () => {
    try {
      const response = await apiService.getActivityById(parseInt(id!));
      setActivity(response);
    } catch (error) {
      toast.error('Aktivite detayları yüklenirken hata oluştu');
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

  if (!activity) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aktivite bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{activity.name}</h1>
        <div className="flex gap-2">
          <Link to={`/activities/${activity.id}/edit`}>
            <Button variant="outline">Düzenle</Button>
          </Link>
          <Link to="/activities">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivite Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Açıklama</h3>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Kategori</h3>
                    <p className="text-gray-600">{activity.categoryName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Süre</h3>
                    <p className="text-gray-600">{activity.durationText}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Zorluk Seviyesi</h3>
                    <p className="text-gray-600">{activity.difficulty}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Eğitmen</h3>
                    <p className="text-gray-600">{activity.instructor}</p>
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
                  <h3 className="font-medium text-gray-900">Maksimum Katılımcı</h3>
                  <p className="text-gray-600">{activity.maxParticipants} kişi</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Minimum Katılımcı</h3>
                  <p className="text-gray-600">{activity.minParticipants} kişi</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mevcut Katılımcı</h3>
                  <p className="text-gray-600">{activity.participantCount} kişi</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Boş Kontenjan</h3>
                  <p className="text-gray-600">{activity.availableSpots} kişi</p>
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
                  <h3 className="font-medium text-gray-900">Gereksinimler</h3>
                  <p className="text-gray-600">{activity.requirements}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ekipman</h3>
                  <p className="text-gray-600">{activity.equipment}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Konum</h3>
                  <p className="text-gray-600">{activity.location}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Notlar</h3>
                  <p className="text-gray-600">{activity.notes || 'Not bulunmuyor'}</p>
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
                    activity.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Müsait:</span>
                  <span className={activity.isAvailable ? 'text-green-600' : 'text-red-600'}>
                    {activity.isAvailable ? 'Evet' : 'Hayır'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dolu:</span>
                  <span className={!activity.isAvailable ? 'text-red-600' : 'text-green-600'}>
                    {!activity.isAvailable ? 'Evet' : 'Hayır'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail; 