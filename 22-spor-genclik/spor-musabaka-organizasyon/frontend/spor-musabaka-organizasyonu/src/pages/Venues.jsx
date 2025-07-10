import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin,
  Building2,
  Users,
  Lightbulb,
  Home,
  Stethoscope,
  Wifi,
  Car
} from 'lucide-react';
import { venueAPI } from '../services/api';
import toast from 'react-hot-toast';

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [indoorFilter, setIndoorFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [lightingFilter, setLightingFilter] = useState('');
  const [changingRoomsFilter, setChangingRoomsFilter] = useState('');
  const [medicalRoomFilter, setMedicalRoomFilter] = useState('');
  const [minCapacityFilter, setMinCapacityFilter] = useState('');
  const [cityStatusFilter, setCityStatusFilter] = useState({ city: '', status: '' });
  const [indoorLightingFilter, setIndoorLightingFilter] = useState({ isIndoor: '', hasLighting: '' });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      let response;
      if (statusFilter) {
        response = await venueAPI.getByStatus(statusFilter);
      } else if (cityFilter) {
        response = await venueAPI.getByCity(cityFilter);
      } else if (indoorFilter !== '') {
        response = await venueAPI.getByIndoor(indoorFilter);
      } else if (lightingFilter !== '') {
        response = await venueAPI.getByLighting(lightingFilter);
      } else if (changingRoomsFilter !== '') {
        response = await venueAPI.getByChangingRooms(changingRoomsFilter);
      } else if (medicalRoomFilter !== '') {
        response = await venueAPI.getByMedicalRoom(medicalRoomFilter);
      } else if (minCapacityFilter) {
        response = await venueAPI.getByMinCapacity(minCapacityFilter);
      } else if (cityStatusFilter.city && cityStatusFilter.status) {
        response = await venueAPI.getByCityAndStatus(cityStatusFilter.city, cityStatusFilter.status);
      } else if (indoorLightingFilter.isIndoor !== '' && indoorLightingFilter.hasLighting !== '') {
        response = await venueAPI.getByIndoorAndLighting(indoorLightingFilter.isIndoor, indoorLightingFilter.hasLighting);
      } else if (searchTerm) {
        response = await venueAPI.search(searchTerm);
      } else {
        response = await venueAPI.getAll();
      }
      setVenues(response.data);
    } catch (error) {
      console.error('Tesisler yüklenirken hata:', error);
      toast.error('Tesisler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu tesisi silmek istediğinizden emin misiniz?')) {
      try {
        await venueAPI.delete(id);
        toast.success('Tesis başarıyla silindi');
        fetchVenues();
      } catch (error) {
        console.error('Tesis silinirken hata:', error);
        toast.error('Tesis silinirken hata oluştu');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await venueAPI.changeStatus(id, newStatus);
      toast.success('Tesis durumu güncellendi');
      fetchVenues();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'Aktif';
      case 'MAINTENANCE':
        return 'Bakımda';
      case 'CLOSED':
        return 'Kapalı';
      case 'RENOVATION':
        return 'Tadilatta';
      default:
        return status;
    }
  };

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || venue.status === statusFilter;
    const matchesCity = !cityFilter || venue.city === cityFilter;
    const matchesIndoor = indoorFilter === '' || venue.isIndoor === (indoorFilter === 'true');
    
    return matchesSearch && matchesStatus && matchesCity && matchesIndoor;
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
          <h1 className="text-2xl font-bold text-gray-900">Tesisler</h1>
          <p className="text-gray-600">Tüm spor tesislerini yönetin</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/venues/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Tesis
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
                placeholder="Tesis ara..."
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
                  <option value="ACTIVE">Aktif</option>
                  <option value="MAINTENANCE">Bakımda</option>
                  <option value="CLOSED">Kapalı</option>
                  <option value="RENOVATION">Tadilatta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Şehirler</option>
                  {Array.from(new Set(venues.map(venue => venue.city)))
                    .filter(Boolean)
                    .map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tesis Türü
                </label>
                <select
                  value={indoorFilter}
                  onChange={(e) => setIndoorFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Tesisler</option>
                  <option value="true">Kapalı</option>
                  <option value="false">Açık</option>
                </select>
              </div>
            </div>

            {/* Gelişmiş filtreler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aydınlatma</label>
                <select value={lightingFilter} onChange={e => setLightingFilter(e.target.value)} className="input-field">
                  <option value="">Tümü</option>
                  <option value="true">Var</option>
                  <option value="false">Yok</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyunma Odası</label>
                <select value={changingRoomsFilter} onChange={e => setChangingRoomsFilter(e.target.value)} className="input-field">
                  <option value="">Tümü</option>
                  <option value="true">Var</option>
                  <option value="false">Yok</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sağlık Odası</label>
                <select value={medicalRoomFilter} onChange={e => setMedicalRoomFilter(e.target.value)} className="input-field">
                  <option value="">Tümü</option>
                  <option value="true">Var</option>
                  <option value="false">Yok</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Kapasite</label>
                <input type="number" value={minCapacityFilter} onChange={e => setMinCapacityFilter(e.target.value)} className="input-field" placeholder="Kapasite" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şehir + Durum</label>
                <div className="flex gap-2">
                  <input type="text" value={cityStatusFilter.city} onChange={e => setCityStatusFilter({ ...cityStatusFilter, city: e.target.value })} className="input-field" placeholder="Şehir" />
                  <select value={cityStatusFilter.status} onChange={e => setCityStatusFilter({ ...cityStatusFilter, status: e.target.value })} className="input-field">
                    <option value="">Durum Seç</option>
                    <option value="ACTIVE">Aktif</option>
                    <option value="MAINTENANCE">Bakımda</option>
                    <option value="CLOSED">Kapalı</option>
                    <option value="RENOVATION">Tadilatta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kapalı + Aydınlatmalı</label>
                <div className="flex gap-2">
                  <select value={indoorLightingFilter.isIndoor} onChange={e => setIndoorLightingFilter({ ...indoorLightingFilter, isIndoor: e.target.value })} className="input-field">
                    <option value="">Kapalı/Açık</option>
                    <option value="true">Kapalı</option>
                    <option value="false">Açık</option>
                  </select>
                  <select value={indoorLightingFilter.hasLighting} onChange={e => setIndoorLightingFilter({ ...indoorLightingFilter, hasLighting: e.target.value })} className="input-field">
                    <option value="">Aydınlatma</option>
                    <option value="true">Var</option>
                    <option value="false">Yok</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tesisler Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {venue.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {venue.description}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {venue.isIndoor ? 'Kapalı Tesis' : 'Açık Tesis'}
                  </span>
                </div>
              </div>
              <span className={`status-badge status-${venue.status?.toLowerCase()}`}>
                {getStatusText(venue.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{venue.city}, {venue.address}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>Kapasite: {venue.capacity || 'N/A'} kişi</span>
              </div>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {venue.hasLighting && (
                <div className="flex items-center text-sm text-green-600">
                  <Lightbulb className="h-4 w-4 mr-1" />
                  <span>Aydınlatma</span>
                </div>
              )}
              
              {venue.hasChangingRooms && (
                <div className="flex items-center text-sm text-green-600">
                  <Home className="h-4 w-4 mr-1" />
                  <span>Soyunma Odası</span>
                </div>
              )}
              
              {venue.hasMedicalRoom && (
                <div className="flex items-center text-sm text-green-600">
                  <Stethoscope className="h-4 w-4 mr-1" />
                  <span>Sağlık Odası</span>
                </div>
              )}
              
              {venue.hasWifi && (
                <div className="flex items-center text-sm text-green-600">
                  <Wifi className="h-4 w-4 mr-1" />
                  <span>WiFi</span>
                </div>
              )}
              
              {venue.hasParking && (
                <div className="flex items-center text-sm text-green-600">
                  <Car className="h-4 w-4 mr-1" />
                  <span>Otopark</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Link
                  to={`/venues/${venue.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/venues/${venue.id}/edit`}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(venue.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <select
                value={venue.status}
                onChange={(e) => handleStatusChange(venue.id, e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ACTIVE">Aktif</option>
                <option value="MAINTENANCE">Bakımda</option>
                <option value="CLOSED">Kapalı</option>
                <option value="RENOVATION">Tadilatta</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Boş Durum */}
      {filteredVenues.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tesis bulunamadı
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter || cityFilter || indoorFilter
              ? 'Arama kriterlerinize uygun tesis bulunamadı.'
              : 'Henüz tesis eklenmemiş.'
            }
          </p>
          <Link to="/venues/new" className="btn-primary">
            İlk Tesisi Ekle
          </Link>
        </div>
      )}
    </div>
  );
};

export default Venues; 