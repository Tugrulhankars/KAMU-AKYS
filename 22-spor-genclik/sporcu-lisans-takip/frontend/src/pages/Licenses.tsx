import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, PauseCircle, XCircle, Download, QrCode } from 'lucide-react';
import { licenseAPI } from '../services/api';
import { LicenseDto, LicenseListDto } from '../types';

const Licenses = () => {
  const [licenses, setLicenses] = useState<LicenseListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLicense, setSelectedLicense] = useState<LicenseDto | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editLicense, setEditLicense] = useState<Partial<LicenseDto>>({});
  const [athleteSearch, setAthleteSearch] = useState('');
  const [athleteResult, setAthleteResult] = useState<LicenseListDto[]>([]);
  const [sportSearch, setSportSearch] = useState('');
  const [sportResult, setSportResult] = useState<LicenseListDto[]>([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const data = await licenseAPI.getAll();
      setLicenses(data);
    } catch (error) {
      alert('Lisanslar alınamadı!');
    }
    setLoading(false);
  };

  const handleEdit = async (license: LicenseListDto) => {
    try {
      const detail = await licenseAPI.getById(license.id);
      setEditLicense(detail);
      setEditMode(true);
    } catch (error) {
      alert('Lisans detayı alınamadı!');
    }
  };

  const handleUpdate = async () => {
    if (!editLicense.id) return;
    try {
      await licenseAPI.update(editLicense.id, editLicense as any);
      setEditMode(false);
      fetchLicenses();
      alert('Lisans güncellendi!');
    } catch (error) {
      alert('Güncelleme başarısız!');
    }
  };

  const handleDelete = async (license: LicenseListDto) => {
    if (!window.confirm('Lisansı silmek istediğinize emin misiniz?')) return;
    try {
      await licenseAPI.delete(license.id);
      fetchLicenses();
      alert('Lisans silindi!');
    } catch (error) {
      alert('Silme başarısız!');
    }
  };

  const handleRenew = async (license: LicenseListDto) => {
    try {
      await licenseAPI.renew({ licenseId: license.id });
      fetchLicenses();
      alert('Lisans yenilendi!');
    } catch (error) {
      alert('Yenileme başarısız!');
    }
  };

  const handleSuspend = async (license: LicenseListDto) => {
    const reason = prompt('Askıya alma sebebini giriniz:');
    if (!reason) return;
    try {
      await licenseAPI.suspend(license.id, reason);
      fetchLicenses();
      alert('Lisans askıya alındı!');
    } catch (error) {
      alert('Askıya alma başarısız!');
    }
  };

  const handleCancel = async (license: LicenseListDto) => {
    const reason = prompt('İptal sebebini giriniz:');
    if (!reason) return;
    try {
      await licenseAPI.cancel(license.id, reason);
      fetchLicenses();
      alert('Lisans iptal edildi!');
    } catch (error) {
      alert('İptal başarısız!');
    }
  };

  const handleDownloadPdf = async (license: LicenseListDto) => {
    setPdfLoading(true);
    try {
      const blob = await licenseAPI.downloadPdf(license.id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `lisans_${license.licenseNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      alert('PDF indirilemedi!');
    }
    setPdfLoading(false);
  };

  const handleGetQrCode = async (license: LicenseListDto) => {
    try {
      const res = await licenseAPI.getQrCode(license.id);
      setQrCode(res.qrCode);
    } catch (error) {
      alert('QR kod alınamadı!');
    }
  };

  const handleAthleteSearch = async () => {
    try {
      const results = await licenseAPI.getByAthlete(Number(athleteSearch));
      setAthleteResult(results);
    } catch (error) {
      setAthleteResult([]);
      alert('Sporcuya ait lisans bulunamadı!');
    }
  };

  const handleSportSearch = async () => {
    try {
      const results = await licenseAPI.getBySport(Number(sportSearch));
      setSportResult(results);
    } catch (error) {
      setSportResult([]);
      alert('Spora ait lisans bulunamadı!');
    }
  };

  const handleSearch = async () => {
    // Arama için mevcut filtreleme kullanılabilir veya API'den arama fonksiyonu eklenebilir
    // Şimdilik filtreleme ile devam ediyorum
  };

  const filteredLicenses = licenses.filter(license =>
    license.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.sportName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lisanslar</h1>
        <button
          onClick={() => navigate('/licenses/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Lisans
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Lisans ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lisans No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sporcu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Geçerlilik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLicenses.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {license.licenseNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{license.athleteName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {license.sportName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {license.licenseTypeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(license.issueDate).toLocaleDateString('tr-TR')}
                      </div>
                      <div className="text-xs text-gray-500">
                        - {new Date(license.expiryDate).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                      {getStatusText(license.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/licenses/${license.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(license)}
                        className="text-green-600 hover:text-green-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(license)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRenew(license)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Yenile"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSuspend(license)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Askıya al"
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCancel(license)}
                        className="text-gray-600 hover:text-gray-900"
                        title="İptal et"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(license)}
                        className="text-gray-600 hover:text-gray-900"
                        title="PDF indir"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleGetQrCode(license)}
                        className="text-gray-600 hover:text-gray-900"
                        title="QR kodu al"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aktif Lisanslar</p>
              <p className="text-2xl font-semibold text-gray-900">
                {licenses.filter(l => l.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Süresi Dolmuş</p>
              <p className="text-2xl font-semibold text-gray-900">
                {licenses.filter(l => l.status === 'expired').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Beklemede</p>
              <p className="text-2xl font-semibold text-gray-900">
                {licenses.filter(l => l.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam</p>
              <p className="text-2xl font-semibold text-gray-900">
                {licenses.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licenses; 