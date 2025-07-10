import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Participant } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import toast from 'react-hot-toast';

const ParticipantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchParticipant();
    }
  }, [id]);

  const fetchParticipant = async () => {
    try {
      const response = await apiService.getParticipantById(parseInt(id!));
      setParticipant(response);
    } catch (error) {
      toast.error('Katılımcı detayları yüklenirken hata oluştu');
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

  if (!participant) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Katılımcı bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{participant.fullName}</h1>
        <div className="flex gap-2">
          <Link to={`/participants/${participant.id}/edit`}>
            <Button variant="outline">Düzenle</Button>
          </Link>
          <Link to="/participants">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">TC Kimlik No</h3>
                  <p className="text-gray-600">{participant.identityNumber}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Doğum Tarihi</h3>
                  <p className="text-gray-600">{new Date(participant.dateOfBirth).toLocaleDateString('tr-TR')}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Yaş</h3>
                  <p className="text-gray-600">{participant.age}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Cinsiyet</h3>
                  <p className="text-gray-600">{participant.gender}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">E-posta</h3>
                  <p className="text-gray-600">{participant.email || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Telefon</h3>
                  <p className="text-gray-600">{participant.phoneNumber || 'Belirtilmemiş'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sağlık Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Kan Grubu</h3>
                  <p className="text-gray-600">{participant.bloodType || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Alerjiler</h3>
                  <p className="text-gray-600">{participant.allergies || 'Alerji yok'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sağlık Durumu</h3>
                  <p className="text-gray-600">{participant.medicalConditions || 'Sağlık sorunu yok'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Okul Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Okul Adı</h3>
                  <p className="text-gray-600">{participant.schoolName || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sınıf</h3>
                  <p className="text-gray-600">{participant.grade || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Öğrenci No</h3>
                  <p className="text-gray-600">{participant.studentId || 'Belirtilmemiş'}</p>
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
                    participant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {participant.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kayıt Sayısı:</span>
                  <span className="font-medium">{participant.registrationCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aktif Kayıt:</span>
                  <span className={participant.hasActiveRegistration ? 'text-green-600' : 'text-red-600'}>
                    {participant.hasActiveRegistration ? 'Var' : 'Yok'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Veli Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h3 className="font-medium text-gray-900">Veli Adı</h3>
                  <p className="text-gray-600">{participant.parentName || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Veli Telefonu</h3>
                  <p className="text-gray-600">{participant.parentPhone || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Veli E-posta</h3>
                  <p className="text-gray-600">{participant.parentEmail || 'Belirtilmemiş'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {participant.registrations && participant.registrations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Kayıtlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {participant.registrations.slice(0, 3).map((registration) => (
                    <div key={registration.id} className="p-2 bg-gray-50 rounded">
                      <h4 className="font-medium text-sm">{registration.campName}</h4>
                      <p className="text-xs text-gray-600">{registration.registrationDate}</p>
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

export default ParticipantDetail; 