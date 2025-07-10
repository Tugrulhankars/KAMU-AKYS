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
  Users,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Play
} from 'lucide-react';
import { matchAPI } from '../services/api';
import toast from 'react-hot-toast';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [refereeFilter, setRefereeFilter] = useState('');
  const [participantFilter, setParticipantFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [roundFilter, setRoundFilter] = useState('');
  const [courtFilter, setCourtFilter] = useState('');
  const [competitionStatusFilter, setCompetitionStatusFilter] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [refereeDateRange, setRefereeDateRange] = useState({ refereeId: '', start: '', end: '' });
  const [competitionRoundFilter, setCompetitionRoundFilter] = useState({ competitionId: '', round: '' });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      let response;
      if (showUpcoming) {
        response = await matchAPI.getUpcoming();
      } else if (refereeFilter) {
        response = await matchAPI.getByReferee(refereeFilter);
      } else if (participantFilter) {
        response = await matchAPI.getByParticipant(participantFilter);
      } else if (dateRange.start && dateRange.end) {
        response = await matchAPI.getByDateRange(dateRange.start, dateRange.end);
      } else if (roundFilter) {
        response = await matchAPI.getByRound(roundFilter);
      } else if (courtFilter) {
        response = await matchAPI.getByCourt(courtFilter);
      } else if (competitionFilter && competitionStatusFilter) {
        response = await matchAPI.getByCompetitionAndStatus(competitionFilter, competitionStatusFilter);
      } else if (refereeDateRange.refereeId && refereeDateRange.start && refereeDateRange.end) {
        response = await matchAPI.getByRefereeAndDateRange(refereeDateRange.refereeId, refereeDateRange.start, refereeDateRange.end);
      } else if (competitionRoundFilter.competitionId && competitionRoundFilter.round) {
        response = await matchAPI.getByCompetitionAndRound(competitionRoundFilter.competitionId, competitionRoundFilter.round);
      } else if (statusFilter) {
        response = await matchAPI.getByStatus(statusFilter);
      } else if (competitionFilter) {
        response = await matchAPI.getByCompetition(competitionFilter);
      } else if (searchTerm) {
        // Arama için mevcut filtreleme
        response = await matchAPI.getAll();
      } else {
        response = await matchAPI.getAll();
      }
      setMatches(response.data);
    } catch (error) {
      console.error('Maçlar yüklenirken hata:', error);
      toast.error('Maçlar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu maçı silmek istediğinizden emin misiniz?')) {
      try {
        await matchAPI.delete(id);
        toast.success('Maç başarıyla silindi');
        fetchMatches();
      } catch (error) {
        console.error('Maç silinirken hata:', error);
        toast.error('Maç silinirken hata oluştu');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await matchAPI.changeStatus(id, newStatus);
      toast.success('Maç durumu güncellendi');
      fetchMatches();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  };

  const handleScoreUpdate = async (id, score1, score2) => {
    try {
      await matchAPI.updateScore(id, score1, score2);
      toast.success('Maç skoru güncellendi');
      fetchMatches();
    } catch (error) {
      console.error('Skor güncellenirken hata:', error);
      toast.error('Skor güncellenirken hata oluştu');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'Planlandı';
      case 'IN_PROGRESS':
        return 'Devam Ediyor';
      case 'COMPLETED':
        return 'Tamamlandı';
      case 'CANCELLED':
        return 'İptal Edildi';
      case 'POSTPONED':
        return 'Ertelendi';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'IN_PROGRESS':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'POSTPONED':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      (match.participant1?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (match.participant2?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (match.competition?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || match.status === statusFilter;
    const matchesCompetition = !competitionFilter || match.competition?.id === parseInt(competitionFilter);
    
    return matchesSearch && matchesStatus && matchesCompetition;
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
          <h1 className="text-2xl font-bold text-gray-900">Maçlar</h1>
          <p className="text-gray-600">Tüm spor maçlarını yönetin</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/matches/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Maç
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
                placeholder="Maç ara..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hakem ID</label>
                <input type="number" value={refereeFilter} onChange={e => setRefereeFilter(e.target.value)} className="input-field" placeholder="Hakem ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Katılımcı ID</label>
                <input type="number" value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} className="input-field" placeholder="Katılımcı ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
                <div className="flex gap-2">
                  <input type="date" value={dateRange.start} onChange={e => setDateRange({ ...dateRange, start: e.target.value })} className="input-field" />
                  <input type="date" value={dateRange.end} onChange={e => setDateRange({ ...dateRange, end: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tur</label>
                <input type="number" value={roundFilter} onChange={e => setRoundFilter(e.target.value)} className="input-field" placeholder="Tur Numarası" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kort</label>
                <input type="number" value={courtFilter} onChange={e => setCourtFilter(e.target.value)} className="input-field" placeholder="Kort Numarası" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Müsabaka ve Durum</label>
                <div className="flex gap-2">
                  <input type="number" value={competitionFilter} onChange={e => setCompetitionFilter(e.target.value)} className="input-field" placeholder="Müsabaka ID" />
                  <select value={competitionStatusFilter} onChange={e => setCompetitionStatusFilter(e.target.value)} className="input-field">
                    <option value="">Durum Seç</option>
                    <option value="SCHEDULED">Planlandı</option>
                    <option value="IN_PROGRESS">Devam Ediyor</option>
                    <option value="COMPLETED">Tamamlandı</option>
                    <option value="CANCELLED">İptal Edildi</option>
                    <option value="POSTPONED">Ertelendi</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className={`btn-secondary ${showUpcoming ? 'bg-blue-100' : ''}`} onClick={() => setShowUpcoming(!showUpcoming)}>
                  Yaklaşan Maçlar
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hakem + Tarih Aralığı</label>
                <div className="flex gap-2">
                  <input type="number" value={refereeDateRange.refereeId} onChange={e => setRefereeDateRange({ ...refereeDateRange, refereeId: e.target.value })} className="input-field" placeholder="Hakem ID" />
                  <input type="date" value={refereeDateRange.start} onChange={e => setRefereeDateRange({ ...refereeDateRange, start: e.target.value })} className="input-field" />
                  <input type="date" value={refereeDateRange.end} onChange={e => setRefereeDateRange({ ...refereeDateRange, end: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Müsabaka + Tur</label>
                <div className="flex gap-2">
                  <input type="number" value={competitionRoundFilter.competitionId} onChange={e => setCompetitionRoundFilter({ ...competitionRoundFilter, competitionId: e.target.value })} className="input-field" placeholder="Müsabaka ID" />
                  <input type="number" value={competitionRoundFilter.round} onChange={e => setCompetitionRoundFilter({ ...competitionRoundFilter, round: e.target.value })} className="input-field" placeholder="Tur Numarası" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Maçlar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map((match) => (
          <div key={match.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {match.participant1?.name || 'TBD'} vs {match.participant2?.name || 'TBD'}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {match.competition?.name}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    Tur {match.roundNumber || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(match.status)}
                <span className={`status-badge status-${match.status?.toLowerCase().replace('_', '-')}`}>
                  {getStatusText(match.status)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {match.scheduledTime && formatDate(match.scheduledTime)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">Kort: {match.courtNumber || 'N/A'}</span>
                <span>Hakem: {match.referee?.name || 'Atanmamış'}</span>
              </div>
            </div>

            {/* Skor Bölümü */}
            {match.status === 'COMPLETED' && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {match.scoreParticipant1 || 0} - {match.scoreParticipant2 || 0}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Final Skor
                  </div>
                </div>
              </div>
            )}

            {/* Skor Güncelleme (Devam eden maçlar için) */}
            {match.status === 'IN_PROGRESS' && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-900 mb-2">
                    Canlı Skor
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <input
                      type="number"
                      min="0"
                      value={match.scoreParticipant1 || 0}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value) || 0;
                        handleScoreUpdate(match.id, newScore, match.scoreParticipant2 || 0);
                      }}
                      className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                    />
                    <span className="text-xl font-bold">-</span>
                    <input
                      type="number"
                      min="0"
                      value={match.scoreParticipant2 || 0}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value) || 0;
                        handleScoreUpdate(match.id, match.scoreParticipant1 || 0, newScore);
                      }}
                      className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Link
                  to={`/matches/${match.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/matches/${match.id}/edit`}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <select
                value={match.status}
                onChange={(e) => handleStatusChange(match.id, e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="SCHEDULED">Planlandı</option>
                <option value="IN_PROGRESS">Devam Ediyor</option>
                <option value="COMPLETED">Tamamlandı</option>
                <option value="CANCELLED">İptal Edildi</option>
                <option value="POSTPONED">Ertelendi</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Boş Durum */}
      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Maç bulunamadı
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter || competitionFilter
              ? 'Arama kriterlerinize uygun maç bulunamadı.'
              : 'Henüz maç eklenmemiş.'
            }
          </p>
          <Link to="/matches/new" className="btn-primary">
            İlk Maçı Ekle
          </Link>
        </div>
      )}
    </div>
  );
};

export default Matches; 