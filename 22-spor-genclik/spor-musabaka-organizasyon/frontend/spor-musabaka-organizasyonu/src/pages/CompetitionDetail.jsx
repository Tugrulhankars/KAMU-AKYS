import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { competitionAPI, participantAPI, matchAPI } from '../services/api';
import toast from 'react-hot-toast';

const CompetitionDetail = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitionDetails();
  }, [id]);

  const fetchCompetitionDetails = async () => {
    try {
      setLoading(true);
      const [compResponse, participantsResponse, matchesResponse] = await Promise.all([
        competitionAPI.getById(id),
        participantAPI.getByCompetition(id),
        matchAPI.getByCompetition(id)
      ]);
      
      setCompetition(compResponse.data);
      setParticipants(participantsResponse.data);
      setMatches(matchesResponse.data);
    } catch (error) {
      console.error('Müsabaka detayları yüklenirken hata:', error);
      toast.error('Müsabaka detayları yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu müsabakayı silmek istediğinizden emin misiniz?')) {
      try {
        await competitionAPI.delete(id);
        toast.success('Müsabaka başarıyla silindi');
        // Ana sayfaya yönlendir
        window.location.href = '/competitions';
      } catch (error) {
        console.error('Müsabaka silinirken hata:', error);
        toast.error('Müsabaka silinirken hata oluştu');
      }
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Müsabaka bulunamadı
        </h3>
        <p className="text-gray-600 mb-4">
          Aradığınız müsabaka mevcut değil veya silinmiş olabilir.
        </p>
        <Link to="/competitions" className="btn-primary">
          Müsabakalara Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve Butonlar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/competitions"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{competition.name}</h1>
            <p className="text-gray-600">Müsabaka detayları</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/competitions/${id}/edit`}
            className="btn-secondary inline-flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Düzenle
          </Link>
          <button
            onClick={handleDelete}
            className="btn-danger inline-flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Sil
          </button>
        </div>
      </div>

      {/* Müsabaka Bilgileri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ana Bilgiler */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Müsabaka Bilgileri</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Durum:</span>
                <span className={`status-badge status-${competition.status?.toLowerCase().replace('_', '-')}`}>
                  {getStatusText(competition.status)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Spor Türü:</span>
                <span className="text-sm text-gray-900">{getSportTypeText(competition.sportType)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Başlangıç Tarihi:</span>
                <span className="text-sm text-gray-900">
                  {competition.startDate ? formatDate(competition.startDate) : 'Belirtilmemiş'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Bitiş Tarihi:</span>
                <span className="text-sm text-gray-900">
                  {competition.endDate ? formatDate(competition.endDate) : 'Belirtilmemiş'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Kayıt Son Tarihi:</span>
                <span className="text-sm text-gray-900">
                  {competition.registrationDeadline ? formatDate(competition.registrationDeadline) : 'Belirtilmemiş'}
                </span>
              </div>
              
              {competition.venue && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Tesis:</span>
                  <span className="text-sm text-gray-900">{competition.venue.name}</span>
                </div>
              )}
              
              {competition.organizer && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Organizatör:</span>
                  <span className="text-sm text-gray-900">
                    {competition.organizer.firstName} {competition.organizer.lastName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {competition.description && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed">{competition.description}</p>
            </div>
          )}
        </div>

        {/* Yan Panel */}
        <div className="space-y-6">
          {/* İstatistikler */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Katılımcılar</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {participants.length}
                  {competition.maxParticipants && ` / ${competition.maxParticipants}`}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Maçlar</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{matches.length}</span>
              </div>
              
              {competition.entryFee && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Kayıt Ücreti</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{competition.entryFee} ₺</span>
                </div>
              )}
              
              {competition.prizePool && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Ödül Havuzu</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{competition.prizePool} ₺</span>
                </div>
              )}
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Erişim</h2>
            
            <div className="space-y-2">
              <Link
                to={`/participants?competition=${id}`}
                className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Users className="h-4 w-4 mr-3" />
                <span>Katılımcıları Görüntüle</span>
              </Link>
              
              <Link
                to={`/matches?competition=${id}`}
                className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Trophy className="h-4 w-4 mr-3" />
                <span>Maçları Görüntüle</span>
              </Link>
              
              <Link
                to={`/participants/new?competition=${id}`}
                className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Users className="h-4 w-4 mr-3" />
                <span>Katılımcı Ekle</span>
              </Link>
              
              <Link
                to={`/matches/new?competition=${id}`}
                className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Trophy className="h-4 w-4 mr-3" />
                <span>Maç Ekle</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Son Maçlar */}
      {matches.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Son Maçlar</h2>
            <Link to={`/matches?competition=${id}`} className="text-sm text-blue-600 hover:text-blue-700">
              Tüm Maçları Gör →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.slice(0, 6).map((match) => (
              <div key={match.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {match.participant1?.name || 'TBD'} vs {match.participant2?.name || 'TBD'}
                  </span>
                  <span className={`status-badge status-${match.status?.toLowerCase().replace('_', '-')}`}>
                    {match.status === 'SCHEDULED' ? 'Planlandı' : 
                     match.status === 'IN_PROGRESS' ? 'Devam Ediyor' :
                     match.status === 'COMPLETED' ? 'Tamamlandı' : match.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {match.scheduledTime && formatDate(match.scheduledTime)}
                  </div>
                  {match.status === 'COMPLETED' && (
                    <div className="mt-1 font-semibold">
                      Skor: {match.scoreParticipant1 || 0} - {match.scoreParticipant2 || 0}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionDetail; 