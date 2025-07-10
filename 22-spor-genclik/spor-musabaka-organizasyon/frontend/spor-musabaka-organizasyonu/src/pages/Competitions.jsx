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
  MapPin,
  Users,
  Trophy
} from 'lucide-react';
import { competitionAPI } from '../services/api';
import toast from 'react-hot-toast';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sportTypeFilter, setSportTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [organizerFilter, setOrganizerFilter] = useState('');
  const [venueFilter, setVenueFilter] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showOpenRegistrations, setShowOpenRegistrations] = useState(false);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      let response;
      if (showUpcoming) {
        response = await competitionAPI.getUpcoming();
      } else if (showOpenRegistrations) {
        response = await competitionAPI.getOpenRegistrations();
      } else if (organizerFilter) {
        response = await competitionAPI.getByOrganizer(organizerFilter);
      } else if (venueFilter) {
        response = await competitionAPI.getByVenue(venueFilter);
      } else if (sportTypeFilter) {
        response = await competitionAPI.getBySportType(sportTypeFilter);
      } else if (statusFilter) {
        response = await competitionAPI.getByStatus(statusFilter);
      } else if (searchTerm) {
        response = await competitionAPI.search(searchTerm);
      } else {
        response = await competitionAPI.getAll();
      }
      setCompetitions(response.data);
    } catch (error) {
      console.error('Müsabakalar yüklenirken hata:', error);
      toast.error('Müsabakalar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu müsabakayı silmek istediğinizden emin misiniz?')) {
      try {
        await competitionAPI.delete(id);
        toast.success('Müsabaka başarıyla silindi');
        fetchCompetitions();
      } catch (error) {
        console.error('Müsabaka silinirken hata:', error);
        toast.error('Müsabaka silinirken hata oluştu');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await competitionAPI.changeStatus(id, newStatus);
      toast.success('Müsabaka durumu güncellendi');
      fetchCompetitions();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PLANNED':
        return 'Planlandı';
      case 'REGISTRATION_OPEN':
        return 'Kayıt Açık';
      case 'REGISTRATION_CLOSED':
        return 'Kayıt Kapalı';
      case 'IN_PROGRESS':
        return 'Devam Ediyor';
      case 'COMPLETED':
        return 'Tamamlandı';
      case 'CANCELLED':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const getSportTypeText = (sportType) => {
    switch (sportType) {
      case 'FOOTBALL':
        return 'Futbol';
      case 'BASKETBALL':
        return 'Basketbol';
      case 'VOLLEYBALL':
        return 'Voleybol';
      case 'TENNIS':
        return 'Tenis';
      case 'SWIMMING':
        return 'Yüzme';
      case 'ATHLETICS':
        return 'Atletizm';
      case 'BOXING':
        return 'Boks';
      case 'WRESTLING':
        return 'Güreş';
      case 'JUDO':
        return 'Judo';
      case 'KARATE':
        return 'Karate';
      case 'TABLE_TENNIS':
        return 'Masa Tenisi';
      case 'BADMINTON':
        return 'Badminton';
      default:
        return sportType;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || competition.status === statusFilter;
    const matchesSportType = !sportTypeFilter || competition.sportType === sportTypeFilter;
    
    return matchesSearch && matchesStatus && matchesSportType;
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
          <h1 className="text-2xl font-bold text-gray-900">Müsabakalar</h1>
          <p className="text-gray-600">Tüm spor müsabakalarını yönetin</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/competitions/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Müsabaka
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
                placeholder="Müsabaka ara..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="PLANNED">Planlandı</option>
                  <option value="REGISTRATION_OPEN">Kayıt Açık</option>
                  <option value="REGISTRATION_CLOSED">Kayıt Kapalı</option>
                  <option value="IN_PROGRESS">Devam Ediyor</option>
                  <option value="COMPLETED">Tamamlandı</option>
                  <option value="CANCELLED">İptal Edildi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spor Türü
                </label>
                <select
                  value={sportTypeFilter}
                  onChange={(e) => setSportTypeFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Spor Türleri</option>
                  <option value="FOOTBALL">Futbol</option>
                  <option value="BASKETBALL">Basketbol</option>
                  <option value="VOLLEYBALL">Voleybol</option>
                  <option value="TENNIS">Tenis</option>
                  <option value="SWIMMING">Yüzme</option>
                  <option value="ATHLETICS">Atletizm</option>
                  <option value="BOXING">Boks</option>
                  <option value="WRESTLING">Güreş</option>
                  <option value="JUDO">Judo</option>
                  <option value="KARATE">Karate</option>
                  <option value="TABLE_TENNIS">Masa Tenisi</option>
                  <option value="BADMINTON">Badminton</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Yeni filtreler ve butonlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organizatör ID</label>
          <input
            type="number"
            value={organizerFilter}
            onChange={(e) => setOrganizerFilter(e.target.value)}
            className="input-field"
            placeholder="Organizatör ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tesis ID</label>
          <input
            type="number"
            value={venueFilter}
            onChange={(e) => setVenueFilter(e.target.value)}
            className="input-field"
            placeholder="Tesis ID"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`btn-secondary ${showUpcoming ? 'bg-blue-100' : ''}`}
            onClick={() => {
              setShowUpcoming(!showUpcoming);
              setShowOpenRegistrations(false);
            }}
          >
            Yaklaşan Müsabakalar
          </button>
          <button
            className={`btn-secondary ${showOpenRegistrations ? 'bg-blue-100' : ''}`}
            onClick={() => {
              setShowOpenRegistrations(!showOpenRegistrations);
              setShowUpcoming(false);
            }}
          >
            Kayıtları Açık Müsabakalar
          </button>
        </div>
      </div>

      {/* Müsabakalar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((competition) => (
          <div key={competition.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {competition.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {competition.description}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {getSportTypeText(competition.sportType)}
                  </span>
                </div>
              </div>
              <span className={`status-badge status-${competition.status.toLowerCase().replace('_', '-')}`}>
                {getStatusText(competition.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {competition.startDate && formatDate(competition.startDate)}
                </span>
              </div>
              
              {competition.venue && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{competition.venue.name}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {competition.participants?.length || 0} katılımcı
                  {competition.maxParticipants && ` / ${competition.maxParticipants} max`}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Link
                  to={`/competitions/${competition.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/competitions/${competition.id}/edit`}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(competition.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <select
                value={competition.status}
                onChange={(e) => handleStatusChange(competition.id, e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="PLANNED">Planlandı</option>
                <option value="REGISTRATION_OPEN">Kayıt Açık</option>
                <option value="REGISTRATION_CLOSED">Kayıt Kapalı</option>
                <option value="IN_PROGRESS">Devam Ediyor</option>
                <option value="COMPLETED">Tamamlandı</option>
                <option value="CANCELLED">İptal Edildi</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Boş Durum */}
      {filteredCompetitions.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Müsabaka bulunamadı
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter || sportTypeFilter 
              ? 'Arama kriterlerinize uygun müsabaka bulunamadı.'
              : 'Henüz müsabaka eklenmemiş.'
            }
          </p>
          <Link to="/competitions/new" className="btn-primary">
            İlk Müsabakayı Ekle
          </Link>
        </div>
      )}
    </div>
  );
};

export default Competitions; 