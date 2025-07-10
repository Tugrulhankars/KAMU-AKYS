import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, User, Award } from 'lucide-react';

interface Athlete {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  sport: string;
  licenseNumber: string;
  status: 'active' | 'inactive';
  email?: string;
  phone?: string;
  address?: string;
}

const AthleteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - gerçek API'den gelecek
    const mockAthlete: Athlete = {
      id: parseInt(id || '1'),
      name: 'Ahmet',
      surname: 'Yılmaz',
      birthDate: '2000-05-15',
      gender: 'Erkek',
      sport: 'Futbol',
      licenseNumber: 'FB001',
      status: 'active',
      email: 'ahmet.yilmaz@email.com',
      phone: '+90 555 123 4567',
      address: 'İstanbul, Türkiye'
    };
    
    setAthlete(mockAthlete);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Sporcu bulunamadı</h2>
          <p className="text-gray-600 mt-2">Aradığınız sporcu mevcut değil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/athletes')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {athlete.name} {athlete.surname}
        </h1>
        <button
          onClick={() => navigate(`/athletes/${athlete.id}/edit`)}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Düzenle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temel Bilgiler */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Temel Bilgiler
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
              <p className="text-gray-900">{athlete.name} {athlete.surname}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Doğum Tarihi</label>
              <p className="text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(athlete.birthDate).toLocaleDateString('tr-TR')}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Cinsiyet</label>
              <p className="text-gray-900">{athlete.gender}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">E-posta</label>
              <p className="text-gray-900">{athlete.email || 'Belirtilmemiş'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Telefon</label>
              <p className="text-gray-900">{athlete.phone || 'Belirtilmemiş'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Adres</label>
              <p className="text-gray-900">{athlete.address || 'Belirtilmemiş'}</p>
            </div>
          </div>
        </div>

        {/* Spor Bilgileri */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Spor Bilgileri
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Spor Dalı</label>
              <p className="text-gray-900">{athlete.sport}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Lisans Numarası</label>
              <p className="text-gray-900 font-mono">{athlete.licenseNumber}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Durum</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                athlete.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {athlete.status === 'active' ? 'Aktif' : 'Pasif'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lisans Geçmişi */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lisans Geçmişi</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lisans No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bitiş Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {athlete.licenseNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2023-01-01
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-12-31
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Aktif
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AthleteDetail; 