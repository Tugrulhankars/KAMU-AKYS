import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  Building,
  CreditCard,
  Shield,
  FileText
} from 'lucide-react';
import { participantAPI } from '../services/api';
import toast from 'react-hot-toast';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userFilter, setUserFilter] = useState('');
  const [clubFilter, setClubFilter] = useState('');
  const [medicalFilter, setMedicalFilter] = useState('');
  const [insuranceFilter, setInsuranceFilter] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('');
  const [dobRange, setDobRange] = useState({ start: '', end: '' });
  const [countCompetitionId, setCountCompetitionId] = useState('');
  const [competitionGenderFilter, setCompetitionGenderFilter] = useState({ competitionId: '', gender: '' });
  const [participantCount, setParticipantCount] = useState(null);
  const [competitionPaymentFilter, setCompetitionPaymentFilter] = useState({ competitionId: '', paymentStatus: '' });

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      let response;
      if (userFilter) {
        response = await participantAPI.getByUser(userFilter);
      } else if (clubFilter) {
        response = await participantAPI.getByClub(clubFilter);
      } else if (medicalFilter !== '') {
        response = await participantAPI.getByMedicalCertificate(medicalFilter);
      } else if (insuranceFilter !== '') {
        response = await participantAPI.getByInsuranceStatus(insuranceFilter);
      } else if (competitionFilter && statusFilter) {
        response = await participantAPI.getByCompetitionAndStatus(competitionFilter, statusFilter);
      } else if (competitionPaymentFilter.competitionId && competitionPaymentFilter.paymentStatus !== '') {
        response = await participantAPI.getByCompetitionAndPaymentStatus(competitionPaymentFilter.competitionId, competitionPaymentFilter.paymentStatus);
      } else if (dobRange.start && dobRange.end) {
        response = await participantAPI.getByDateOfBirthRange(dobRange.start, dobRange.end);
      } else if (competitionGenderFilter.competitionId && competitionGenderFilter.gender) {
        response = await participantAPI.getByCompetitionAndGender(competitionGenderFilter.competitionId, competitionGenderFilter.gender);
      } else if (searchTerm) {
        response = await participantAPI.search(searchTerm);
      } else {
        response = await participantAPI.getAll();
      }
      setParticipants(response.data);
    } catch (error) {
      console.error('Katılımcılar yüklenirken hata:', error);
      toast.error('Katılımcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipantCount = async () => {
    if (!countCompetitionId) return;
    try {
      const response = await participantAPI.getCountByCompetition(countCompetitionId);
      setParticipantCount(response.data);
      toast.success('Katılımcı sayısı getirildi');
    } catch {
      toast.error('Katılımcı sayısı alınamadı');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu katılımcıyı silmek istediğinizden emin misiniz?')) {
      try {
        await participantAPI.delete(id);
        toast.success('Katılımcı başarıyla silindi');
        fetchParticipants();
      } catch (error) {
        console.error('Katılımcı silinirken hata:', error);
        toast.error('Katılımcı silinirken hata oluştu');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await participantAPI.changeStatus(id, newStatus);
      toast.success('Katılımcı durumu güncellendi');
      fetchParticipants();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  };

  const handlePaymentStatusChange = async (id, paymentStatus) => {
    try {
      await participantAPI.updatePaymentStatus(id, paymentStatus);
      toast.success('Ödeme durumu güncellendi');
      fetchParticipants();
    } catch (error) {
      console.error('Ödeme durumu güncellenirken hata:', error);
      toast.error('Ödeme durumu güncellenirken hata oluştu');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'REGISTERED':
        return 'Kayıtlı';
      case 'CONFIRMED':
        return 'Onaylandı';
      case 'WITHDRAWN':
        return 'Çekildi';
      case 'DISQUALIFIED':
        return 'Diskalifiye';
      default:
        return status;
    }
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case 'MALE':
        return 'Erkek';
      case 'FEMALE':
        return 'Kadın';
      default:
        return gender;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.clubName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || participant.status === statusFilter;
    const matchesGender = !genderFilter || participant.gender === genderFilter;
    const matchesPayment = paymentFilter === '' || participant.paymentStatus === (paymentFilter === 'true');
    
    return matchesSearch && matchesStatus && matchesGender && matchesPayment;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve Butonlar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Katılımcılar</h1>
          <p className="text-gray-600">Tüm müsabaka katılımcılarını yönetin</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/participants/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Katılımcı
          </Link>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Katılımcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtreler
          </button>
        </div>

        {/* Filtre Seçenekleri */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Durumlar</option>
                  <option value="REGISTERED">Kayıtlı</option>
                  <option value="CONFIRMED">Onaylandı</option>
                  <option value="WITHDRAWN">Çekildi</option>
                  <option value="DISQUALIFIED">Diskalifiye</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cinsiyet
                </label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Cinsiyetler</option>
                  <option value="MALE">Erkek</option>
                  <option value="FEMALE">Kadın</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ödeme Durumu
                </label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Ödemeler</option>
                  <option value="true">Ödendi</option>
                  <option value="false">Ödenmedi</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gelişmiş filtreler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı ID</label>
          <input type="number" value={userFilter} onChange={e => setUserFilter(e.target.value)} className="input-field" placeholder="Kullanıcı ID" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kulüp Adı</label>
          <input type="text" value={clubFilter} onChange={e => setClubFilter(e.target.value)} className="input-field" placeholder="Kulüp Adı" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sağlık Raporu</label>
          <select value={medicalFilter} onChange={e => setMedicalFilter(e.target.value)} className="input-field">
            <option value="">Tümü</option>
            <option value="true">Var</option>
            <option value="false">Yok</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sigorta</label>
          <select value={insuranceFilter} onChange={e => setInsuranceFilter(e.target.value)} className="input-field">
            <option value="">Tümü</option>
            <option value="true">Var</option>
            <option value="false">Yok</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Müsabaka ve Durum</label>
          <div className="flex gap-2">
            <input type="number" value={competitionFilter} onChange={e => setCompetitionFilter(e.target.value)} className="input-field" placeholder="Müsabaka ID" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field">
              <option value="">Tümü</option>
              <option value="REGISTERED">Kayıtlı</option>
              <option value="CONFIRMED">Onaylandı</option>
              <option value="WITHDRAWN">Çekildi</option>
              <option value="DISQUALIFIED">Diskalifiye</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Müsabaka ve Ödeme Durumu</label>
          <div className="flex gap-2">
            <input type="number" value={competitionPaymentFilter.competitionId} onChange={e => setCompetitionPaymentFilter({ ...competitionPaymentFilter, competitionId: e.target.value })} className="input-field" placeholder="Müsabaka ID" />
            <select value={competitionPaymentFilter.paymentStatus} onChange={e => setCompetitionPaymentFilter({ ...competitionPaymentFilter, paymentStatus: e.target.value })} className="input-field">
              <option value="">Tümü</option>
              <option value="true">Ödedi</option>
              <option value="false">Ödemedi</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi Aralığı</label>
          <div className="flex gap-2">
            <input type="date" value={dobRange.start} onChange={e => setDobRange({ ...dobRange, start: e.target.value })} className="input-field" />
            <input type="date" value={dobRange.end} onChange={e => setDobRange({ ...dobRange, end: e.target.value })} className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Katılımcı Sayısı (Müsabaka ID)</label>
          <div className="flex gap-2 items-center">
            <input type="number" value={countCompetitionId} onChange={e => setCountCompetitionId(e.target.value)} className="input-field" placeholder="Müsabaka ID" />
            <button className="btn-secondary" onClick={fetchParticipantCount}>Getir</button>
            {participantCount !== null && <span className="ml-2">{participantCount}</span>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Müsabaka ve Cinsiyet</label>
          <div className="flex gap-2">
            <input type="number" value={competitionGenderFilter.competitionId} onChange={e => setCompetitionGenderFilter({ ...competitionGenderFilter, competitionId: e.target.value })} className="input-field" placeholder="Müsabaka ID" />
            <select value={competitionGenderFilter.gender} onChange={e => setCompetitionGenderFilter({ ...competitionGenderFilter, gender: e.target.value })} className="input-field">
              <option value="">Tümü</option>
              <option value="MALE">Erkek</option>
              <option value="FEMALE">Kadın</option>
            </select>
          </div>
        </div>
      </div>

      {/* Katılımcılar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParticipants.map((participant) => (
          <div key={participant.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {participant.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {participant.email}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {getGenderText(participant.gender)}
                  </span>
                </div>
              </div>
              <span className={`status-badge status-${participant.status?.toLowerCase()}`}>
                {getStatusText(participant.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Doğum: {participant.dateOfBirth && formatDate(participant.dateOfBirth)}
                </span>
              </div>
              
              {participant.clubName && (
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{participant.clubName}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">Yaş: {participant.age || 'N/A'}</span>
                <span>Telefon: {participant.phoneNumber || 'N/A'}</span>
              </div>
            </div>

            {/* Durum İkonları */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center text-sm">
                <CreditCard className={`h-4 w-4 mr-1 ${participant.paymentStatus ? 'text-green-500' : 'text-red-500'}`} />
                <span className={participant.paymentStatus ? 'text-green-600' : 'text-red-600'}>
                  {participant.paymentStatus ? 'Ödendi' : 'Ödenmedi'}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <FileText className={`h-4 w-4 mr-1 ${participant.medicalCertificate ? 'text-green-500' : 'text-red-500'}`} />
                <span className={participant.medicalCertificate ? 'text-green-600' : 'text-red-600'}>
                  {participant.medicalCertificate ? 'Sağlık Raporu' : 'Rapor Yok'}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <Shield className={`h-4 w-4 mr-1 ${participant.insuranceStatus ? 'text-green-500' : 'text-red-500'}`} />
                <span className={participant.insuranceStatus ? 'text-green-600' : 'text-red-600'}>
                  {participant.insuranceStatus ? 'Sigortalı' : 'Sigortasız'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Link
                  to={`/participants/${participant.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/participants/${participant.id}/edit`}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(participant.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={participant.status}
                  onChange={(e) => handleStatusChange(participant.id, e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="REGISTERED">Kayıtlı</option>
                  <option value="CONFIRMED">Onaylandı</option>
                  <option value="WITHDRAWN">Çekildi</option>
                  <option value="DISQUALIFIED">Diskalifiye</option>
                </select>
                
                <button
                  onClick={() => handlePaymentStatusChange(participant.id, !participant.paymentStatus)}
                  className={`text-xs px-2 py-1 rounded ${
                    participant.paymentStatus 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {participant.paymentStatus ? 'Ödeme İptal' : 'Ödeme Al'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Boş Durum */}
      {filteredParticipants.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Katılımcı bulunamadı
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter || genderFilter || paymentFilter
              ? 'Arama kriterlerinize uygun katılımcı bulunamadı.'
              : 'Henüz katılımcı eklenmemiş.'
            }
          </p>
          <Link to="/participants/new" className="btn-primary">
            İlk Katılımcıyı Ekle
          </Link>
        </div>
      )}
    </div>
  );
};

export default Participants; 