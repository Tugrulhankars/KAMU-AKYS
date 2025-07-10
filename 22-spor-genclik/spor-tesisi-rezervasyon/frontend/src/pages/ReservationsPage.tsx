import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { reservationAPI, facilityAPI, Reservation, Facility } from '../services/api';
import { Calendar, Clock, MapPin, User, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import Layout from "../components/Layout";

const stats = [
  {
    label: "Toplam Rezervasyon",
    value: "320",
    description: "Sistemdeki toplam rezervasyon sayısı",
  },
  {
    label: "Aktif Rezervasyon",
    value: "24",
    description: "Şu an devam eden rezervasyonlar",
  },
  {
    label: "İptal Edilen",
    value: "15",
    description: "İptal edilen rezervasyonlar",
  },
];

const ReservationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<number | ''>('');

  useEffect(() => {
    loadReservations();
    loadFacilities();
  }, []);

  const loadReservations = async () => {
    try {
      let data;
      const facilityId = searchParams.get('facilityId');
      
      if (facilityId) {
        data = await reservationAPI.getByFacility(parseInt(facilityId));
      } else {
        data = await reservationAPI.getMyReservations();
      }
      
      setReservations(data);
    } catch (error: any) {
      toast.error('Rezervasyonlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const loadFacilities = async () => {
    try {
      const data = await facilityAPI.getAll();
      setFacilities(data);
    } catch (error: any) {
      console.error('Tesisler yüklenemedi:', error);
    }
  };

  const handleCancelReservation = async (reservationId: number) => {
    if (!window.confirm('Bu rezervasyonu iptal etmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await reservationAPI.cancel(reservationId);
      toast.success('Rezervasyon başarıyla iptal edildi');
      loadReservations(); // Listeyi yenile
    } catch (error: any) {
      toast.error('Rezervasyon iptal edilirken bir hata oluştu');
    }
  };

  const formatDateTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'confirmed':
        return 'Onaylandı';
      case 'pending':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.facility?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === '' || reservation.status.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesFacility = selectedFacility === '' || reservation.facilityId === selectedFacility;
    
    return matchesSearch && matchesStatus && matchesFacility;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      {/* İstatistik kutuları */}
      <div className="max-w-5xl mx-auto mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
          >
            <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
            <div className="text-lg font-semibold mt-2">{stat.label}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.description}</div>
          </div>
        ))}
      </div>
      {/* Kartlar */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Yaklaşan Rezervasyonlar</h2>
          <p className="text-gray-600">Yaklaşan rezervasyonlarınızı görüntüleyin ve yönetim işlemlerini kolayca gerçekleştirin.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Geçmiş Rezervasyonlar</h2>
          <p className="text-gray-600">Geçmiş rezervasyonlarınızı inceleyin, iptal veya değişiklik geçmişini görüntüleyin.</p>
        </div>
      </div>
      <div className="min-h-screen bg-green-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-green-700 mb-2">Rezervasyonlarım</h1>
                <p className="text-green-800">Tüm rezervasyonlarınızı görüntüleyin ve yönetin</p>
              </div>
              <Link
                to="/reservations/new"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Rezervasyon
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8 border-l-4 border-green-600">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <input
                  type="text"
                  placeholder="Rezervasyon ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Tüm Durumlar</option>
                  <option value="confirmed">Onaylandı</option>
                  <option value="pending">Beklemede</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </div>

              {/* Facility Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value ? Number(e.target.value) : '')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Tüm Tesisler</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id}>{facility.name}</option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-end">
                <span className="text-sm text-green-700">
                  {filteredReservations.length} rezervasyon bulundu
                </span>
              </div>
            </div>
          </div>

          {/* Reservations List */}
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg shadow border-l-4 border-green-600 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-1">{reservation.facility?.name || 'Bilinmeyen Tesis'}</h3>
                  <div className="flex items-center text-green-800 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDateTime(reservation.startTime)} - {formatDateTime(reservation.endTime)}</span>
                  </div>
                  {reservation.notes && (
                    <p className="text-green-800 text-sm mb-2">Not: {reservation.notes}</p>
                  )}
                </div>
                <div className="flex flex-col md:items-end md:justify-between gap-2 mt-4 md:mt-0">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    {reservation.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        İptal Et
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rezervasyon bulunamadı</h3>
              <p className="text-gray-600 mb-4">Henüz rezervasyon yapmamışsınız veya arama kriterlerinize uygun rezervasyon bulunmuyor.</p>
              <Link
                to="/facilities"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Tesisleri Keşfet
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReservationsPage; 