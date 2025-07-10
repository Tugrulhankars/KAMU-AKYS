import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { facilityAPI, reservationAPI, Facility, FacilityType } from '../services/api';
import { MapPin, Phone, Mail, Users, Clock, Star, Calendar, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const FacilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [facility, setFacility] = useState<Facility | null>(null);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    startTime: '',
    endTime: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      loadFacility(parseInt(id));
      loadFacilityTypes();
    }
  }, [id]);

  const loadFacility = async (facilityId: number) => {
    try {
      const data = await facilityAPI.getById(facilityId);
      setFacility(data);
    } catch (error: any) {
      toast.error('Tesis bilgileri yüklenirken bir hata oluştu');
      navigate('/facilities');
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

  const getFacilityTypeName = (typeId: number) => {
    const type = facilityTypes.find(t => t.id === typeId);
    return type?.name || 'Bilinmeyen Tür';
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!facility) return;

    try {
      await reservationAPI.create({
        facilityId: facility.id,
        startTime: new Date(reservationData.startTime),
        endTime: new Date(reservationData.endTime),
        notes: reservationData.notes || undefined
      });
      
      toast.success('Rezervasyon başarıyla oluşturuldu!');
      setShowReservationModal(false);
      setReservationData({ startTime: '', endTime: '', notes: '' });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Rezervasyon oluşturulurken bir hata oluştu';
      toast.error(message);
    }
  };

  const handleDeleteFacility = async () => {
    if (!facility || !window.confirm('Bu tesisi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await facilityAPI.delete(facility.id);
      toast.success('Tesis başarıyla silindi');
      navigate('/facilities');
    } catch (error: any) {
      toast.error('Tesis silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-2">Tesis bulunamadı</h2>
          <Link to="/facilities" className="text-green-600 hover:text-green-500">
            Tesislere geri dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/facilities"
            className="inline-flex items-center text-green-600 hover:text-green-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tesislere geri dön
          </Link>
        </div>

        {/* Facility Header */}
        <div className="bg-white rounded-lg shadow border-l-4 border-green-600 overflow-hidden mb-8">
          <div className="h-64 bg-gradient-to-br from-green-500 to-green-300 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🏟️</div>
              <div className="text-xl font-medium">{getFacilityTypeName(facility.facilityTypeId)}</div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-green-700 mb-2">{facility.name}</h1>
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-2 text-green-800">5.0 (24 değerlendirme)</span>
                </div>
              </div>
              
              {user && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/facilities/${facility.id}/edit`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDeleteFacility}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            {facility.description && (
              <p className="text-green-800 text-lg mb-6">{facility.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center text-green-800">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{facility.address}</span>
                </div>
                
                {facility.phoneNumber && (
                  <div className="flex items-center text-green-800">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>{facility.phoneNumber}</span>
                  </div>
                )}
                
                {facility.email && (
                  <div className="flex items-center text-green-800">
                    <Mail className="h-5 w-5 mr-3" />
                    <span>{facility.email}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-green-800">
                  <Users className="h-5 w-5 mr-3" />
                  <span>Kapasite: {facility.capacity} kişi</span>
                </div>
                
                <div className="flex items-center text-green-800">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>Saatlik: ₺{facility.hourlyRate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowReservationModal(true)}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Rezervasyon Yap
              </button>
              <Link
                to={`/reservations?facilityId=${facility.id}`}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Rezervasyonları Görüntüle
              </Link>
            </div>
          </div>
        </div>

        {/* Reservation Modal */}
        {showReservationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Rezervasyon Yap</h3>
              
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Başlangıç Zamanı
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={reservationData.startTime}
                    onChange={(e) => setReservationData({...reservationData, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bitiş Zamanı
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={reservationData.endTime}
                    onChange={(e) => setReservationData({...reservationData, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notlar (Opsiyonel)
                  </label>
                  <textarea
                    value={reservationData.notes}
                    onChange={(e) => setReservationData({...reservationData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Rezervasyon ile ilgili notlarınız..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReservationModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Rezervasyon Yap
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityDetailPage; 