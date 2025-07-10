import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { createReport } from '../services/reportService';
import { toast } from 'react-toastify';

const JuryDashboardPage = () => {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // ID of the idea being processed
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportIdeaId, setReportIdeaId] = useState(null);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  const isJury = user && user.role === 'Jury';

  useEffect(() => {
    if (!isAuthenticated || !isJury) return;
    const fetchPendingIdeas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/ideas/by-status/Pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIdeas(response.data);
      } catch {
        setError('Onay bekleyen fikirler yüklenemedi!');
      }
      setLoading(false);
    };
    fetchPendingIdeas();
  }, [isAuthenticated, token, isJury]);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      if (action === 'approve') {
        await axios.put(`http://localhost:5000/api/ideas/${id}/approve`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (action === 'reject') {
        await axios.put(`http://localhost:5000/api/ideas/${id}/reject`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    } catch {
      alert('İşlem başarısız!');
    }
    setActionLoading(null);
  };

  const openReportModal = (ideaId) => {
    setReportIdeaId(ideaId);
    setReportTitle('');
    setReportDescription('');
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setReportLoading(true);
    try {
      await createReport({
        ideaId: reportIdeaId,
        title: reportTitle,
        description: reportDescription,
        createdBy: user?.userName,
      });
      toast.success('Rapor başarıyla oluşturuldu!');
      setShowReportModal(false);
    } catch {
      toast.error('Rapor oluşturulamadı!');
    }
    setReportLoading(false);
  };

  if (!isAuthenticated || !isJury) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white p-6 rounded shadow text-center">
            <p>Bu sayfaya erişim yetkiniz yok.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Jüri Değerlendirme Paneli</h2>
        {loading && <div className="text-center">Yükleniyor...</div>}
        {error && <div className="text-red-500 text-center bg-red-50 p-3 rounded">{error}</div>}
        {!loading && !error && ideas.length === 0 && (
          <div className="text-center text-gray-500 bg-gray-50 p-4 rounded">Onay bekleyen fikir bulunmuyor.</div>
        )}
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-blue-800">{idea.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{idea.description}</p>
                <span className="text-xs text-gray-400 mt-2 block">Başvuran: {idea.createdBy}</span>
              </div>
              <div className="flex-shrink-0 flex gap-3 mt-3 sm:mt-0">
                <button
                  onClick={() => handleAction(idea.id, 'approve')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  disabled={actionLoading === idea.id}
                >
                  {actionLoading === idea.id ? '...' : 'Onayla'}
                </button>
                <button
                  onClick={() => handleAction(idea.id, 'reject')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
                  disabled={actionLoading === idea.id}
                >
                  {actionLoading === idea.id ? '...' : 'Reddet'}
                </button>
                <button
                  onClick={() => openReportModal(idea.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Rapor Oluştur
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Rapor Oluştur Modalı */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/60">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto p-8 animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={closeReportModal}
                aria-label="Kapat"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Rapor Oluştur</h3>
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Başlık</label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={e => setReportTitle(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Açıklama</label>
                  <textarea
                    value={reportDescription}
                    onChange={e => setReportDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                    onClick={closeReportModal}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    disabled={reportLoading}
                  >
                    {reportLoading ? 'Oluşturuluyor...' : 'Oluştur'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JuryDashboardPage; 