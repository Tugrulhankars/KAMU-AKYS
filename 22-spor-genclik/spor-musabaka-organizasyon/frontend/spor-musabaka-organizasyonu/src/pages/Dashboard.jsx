import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  Gamepad2, 
  Building2, 
  TrendingUp, 
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { competitionAPI, participantAPI, matchAPI, venueAPI } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    competitions: 0,
    participants: 0,
    matches: 0,
    venues: 0
  });
  const [recentCompetitions, setRecentCompetitions] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // İstatistikleri getir
        const [competitions, participants, matches, venues] = await Promise.all([
          competitionAPI.getAll(),
          participantAPI.getAll(),
          matchAPI.getAll(),
          venueAPI.getAll()
        ]);

        setStats({
          competitions: competitions.data.length,
          participants: participants.data.length,
          matches: matches.data.length,
          venues: venues.data.length
        });

        // Son müsabakaları getir
        const recentComps = competitions.data.slice(0, 5);
        setRecentCompetitions(recentComps);

        // Yaklaşan maçları getir
        const upcoming = await matchAPI.getUpcoming();
        setUpcomingMatches(upcoming.data.slice(0, 5));

      } catch (error) {
        console.error('Dashboard veri yükleme hatası:', error);
        toast.error('Dashboard verileri yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PLANNED':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'REGISTRATION_OPEN':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'IN_PROGRESS':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Spor müsabaka organizasyonu genel bakış</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Müsabaka</p>
              <p className="text-2xl font-bold text-gray-900">{stats.competitions}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Katılımcı</p>
              <p className="text-2xl font-bold text-gray-900">{stats.participants}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Gamepad2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Maç</p>
              <p className="text-2xl font-bold text-gray-900">{stats.matches}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Tesis</p>
              <p className="text-2xl font-bold text-gray-900">{stats.venues}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son Müsabakalar */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Son Müsabakalar</h2>
            <Link to="/competitions" className="text-sm text-blue-600 hover:text-blue-700">
              Tümünü Gör →
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentCompetitions.length > 0 ? (
              recentCompetitions.map((competition) => (
                <div key={competition.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(competition.status)}
                    <div>
                      <p className="font-medium text-gray-900">{competition.name}</p>
                      <p className="text-sm text-gray-600">
                        {competition.startDate && formatDate(competition.startDate)}
                      </p>
                    </div>
                  </div>
                  <span className={`status-badge status-${competition.status.toLowerCase().replace('_', '-')}`}>
                    {getStatusText(competition.status)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Henüz müsabaka bulunmuyor</p>
            )}
          </div>
        </div>

        {/* Yaklaşan Maçlar */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Yaklaşan Maçlar</h2>
            <Link to="/matches" className="text-sm text-blue-600 hover:text-blue-700">
              Tümünü Gör →
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {match.participant1?.name || 'TBD'} vs {match.participant2?.name || 'TBD'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {match.scheduledTime && formatDate(match.scheduledTime)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    Kort {match.courtNumber || 'N/A'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Yaklaşan maç bulunmuyor</p>
            )}
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/competitions"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Trophy className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">Müsabaka Ekle</span>
          </Link>
          
          <Link
            to="/participants"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Katılımcı Ekle</span>
          </Link>
          
          <Link
            to="/matches"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Gamepad2 className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Maç Ekle</span>
          </Link>
          
          <Link
            to="/venues"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <Building2 className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">Tesis Ekle</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 