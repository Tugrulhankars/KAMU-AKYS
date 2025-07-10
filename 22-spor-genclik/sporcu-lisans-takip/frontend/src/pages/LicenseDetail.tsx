import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, User, Award, FileText } from 'lucide-react';

interface License {
  id: number;
  licenseNumber: string;
  athleteName: string;
  athleteId: number;
  sport: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  type: string;
  issuedBy: string;
  issuedDate: string;
  notes?: string;
}

const LicenseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - gerçek API'den gelecek
    const mockLicense: License = {
      id: parseInt(id || '1'),
      licenseNumber: 'FB001',
      athleteName: 'Ahmet Yılmaz',
      athleteId: 1,
      sport: 'Futbol',
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      status: 'active',
      type: 'Profesyonel',
      issuedBy: 'Türkiye Futbol Federasyonu',
      issuedDate: '2023-01-01',
      notes: 'Profesyonel futbolcu lisansı'
    };
    
    setLicense(mockLicense);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!license) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Lisans bulunamadı</h2>
          <p className="text-gray-600 mt-2">Aradığınız lisans mevcut değil.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'expired':
        return 'Süresi Dolmuş';
      case 'pending':
        return 'Beklemede';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/licenses')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Lisans: {license.licenseNumber}
        </h1>
        <button
          onClick={() => navigate(`/licenses/${license.id}/edit`)}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Düzenle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lisans Bilgileri */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Lisans Bilgileri
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Lisans Numarası</label>
              <p className="text-gray-900 font-mono text-lg">{license.licenseNumber}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Spor Dalı</label>
              <p className="text-gray-900">{license.sport}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Lisans Tipi</label>
              <p className="text-gray-900">{license.type}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Durum</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                {getStatusText(license.status)}
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Veren Kurum</label>
              <p className="text-gray-900">{license.issuedBy}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Veriliş Tarihi</label>
              <p className="text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(license.issuedDate).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        </div>

        {/* Sporcu Bilgileri */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Sporcu Bilgileri
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Sporcu Adı</label>
              <p className="text-gray-900">{license.athleteName}</p>
            </div>
            
            <button
              onClick={() => navigate(`/athletes/${license.athleteId}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Sporcu Detaylarını Görüntüle →
            </button>
          </div>
        </div>
      </div>

      {/* Geçerlilik Süresi */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Geçerlilik Süresi
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Başlangıç Tarihi</label>
            <p className="text-gray-900 text-lg">
              {new Date(license.startDate).toLocaleDateString('tr-TR')}
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Bitiş Tarihi</label>
            <p className="text-gray-900 text-lg">
              {new Date(license.endDate).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(0, Math.min(100, 
                  ((new Date().getTime() - new Date(license.startDate).getTime()) / 
                  (new Date(license.endDate).getTime() - new Date(license.startDate).getTime())) * 100
                ))}%`
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Lisans süresinin %{Math.round(
              Math.max(0, Math.min(100, 
                ((new Date().getTime() - new Date(license.startDate).getTime()) / 
                (new Date(license.endDate).getTime() - new Date(license.startDate).getTime())) * 100
              ))
            )}i tamamlandı
          </p>
        </div>
      </div>

      {/* Notlar */}
      {license.notes && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notlar</h2>
          <p className="text-gray-700">{license.notes}</p>
        </div>
      )}
    </div>
  );
};

export default LicenseDetail; 