import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { facilityAPI, Facility, FacilityType } from '../services/api';
import { MapPin, Phone, Mail, Users, Clock, Star, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const stats = [
  {
    label: "Toplam Tesis",
    value: "12",
    description: "Sistemde kayıtlı tesis sayısı",
  },
  {
    label: "Aktif Tesis",
    value: "8",
    description: "Şu an hizmet veren tesisler",
  },
  {
    label: "Rezervasyona Açık",
    value: "10",
    description: "Rezervasyon yapılabilen tesisler",
  },
];

const FacilitiesPage: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'capacity'>('name');

  useEffect(() => {
    loadFacilities();
    loadFacilityTypes();
  }, []);

  const loadFacilities = async () => {
    try {
      const data = await facilityAPI.getAll();
      setFacilities(data);
    } catch (error: any) {
      toast.error('Tesisler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const loadFacilityTypes = async () => {
    try {
      const data = await facilityAPI.getTypes();
      setFacilityTypes(data);
    } catch (error: any) {
      console.error('Tesis türleri yüklenemedi:', error);
    }
  };

  const filteredAndSortedFacilities = facilities
    .filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === '' || facility.facilityTypeId === selectedType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return 0;
      }
    });

  const getFacilityTypeName = (typeId: number) => {
    const type = facilityTypes.find(t => t.id === typeId);
    return type?.name || 'Bilinmeyen Tür';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          <h2 className="text-xl font-bold text-blue-700 mb-2">Tesis Yönetimi</h2>
          <p className="text-gray-600">Tesislerinizi kolayca yönetin, yeni tesis ekleyin veya mevcut tesisleri düzenleyin.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Rezervasyon Durumu</h2>
          <p className="text-gray-600">Tesislerinizin rezervasyon durumunu anlık olarak görüntüleyin ve yönetin.</p>
        </div>
      </div>
      <div className="min-h-screen bg-green-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-2">Spor Tesisleri</h1>
            <p className="text-green-800">Mevcut spor tesislerini keşfedin ve rezervasyon yapın</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8 border-l-4 border-green-600">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <input
                  type="text"
                  placeholder="Tesis ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value ? Number(e.target.value) : '')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Tüm Türler</option>
                  {facilityTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'capacity')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="name">İsme Göre</option>
                  <option value="price">Fiyata Göre</option>
                  <option value="capacity">Kapasiteye Göre</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-end">
                <span className="text-sm text-green-700">
                  {filteredAndSortedFacilities.length} tesis bulundu
                </span>
              </div>
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedFacilities.map((facility) => (
              <div key={facility.id} className="bg-white rounded-lg shadow border-l-4 border-green-600 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-500 to-green-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🏟️</div>
                    <div className="text-sm font-medium">{getFacilityTypeName(facility.facilityTypeId)}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-green-700">{facility.name}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                  
                  {facility.description && (
                    <p className="text-green-800 text-sm mb-4 line-clamp-2">{facility.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-green-800">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="truncate">{facility.address}</span>
                    </div>
                    
                    {facility.phoneNumber && (
                      <div className="flex items-center text-sm text-green-800">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{facility.phoneNumber}</span>
                      </div>
                    )}
                    
                    {facility.email && (
                      <div className="flex items-center text-sm text-green-800">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="truncate">{facility.email}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-green-800">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Kapasite: {facility.capacity} kişi</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-green-800">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Saatlik: ₺{facility.hourlyRate}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/facilities/${facility.id}`}
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Detaylar
                    </Link>
                    <Link
                      to={`/reservations/new?facilityId=${facility.id}`}
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Rezervasyon
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedFacilities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏟️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tesis bulunamadı</h3>
              <p className="text-gray-600">Arama kriterlerinize uygun tesis bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FacilitiesPage; 