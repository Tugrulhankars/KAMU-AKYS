import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../services/api';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const GroupDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('surveys');

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Grup bilgilerini getir
        const groupResponse = await apiClient.get(`/groups/${id}`);
        setGroup(groupResponse.data);

        // Grup üyelerini getir
        const membersResponse = await apiClient.get(`/groups/${id}/members`);
        setMembers(membersResponse.data);

        // Grup anketlerini getir
        const surveysResponse = await apiClient.get(`/surveys/group/${id}`);
        setSurveys(surveysResponse.data);

      } catch (err) {
        setError('Grup bilgileri yüklenemedi: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleApprove = async (userId) => {
    try {
      await apiClient.post(`/groups/${id}/approve/${userId}`);
      // Üyeler listesini güncelle
      const membersRes = await apiClient.get(`/groups/${id}/members`);
      setMembers(membersRes.data);
    } catch (err) {
      alert('Onaylama işlemi başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async (userId) => {
    try {
      await apiClient.post(`/groups/${id}/reject/${userId}`);
      const membersRes = await apiClient.get(`/groups/${id}/members`);
      setMembers(membersRes.data);
    } catch (err) {
      alert('Reddetme işlemi başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="text-center mt-8">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!group) return <div className="text-center mt-8">Grup bulunamadı</div>;

  const approvedMembers = members.filter(member => member.status === 'APPROVED');
  const pendingMembers = members.filter(member => member.status === 'PENDING');
  
  // Kullanıcının bu gruptaki rolünü bul
  const currentUserMember = user ? members.find(member => 
    member.user.id === user.id && member.status === 'APPROVED'
  ) : null;
  
  const userRole = currentUserMember?.role || null;
  
  // Rol bazında yetkilendirme
  const isAdmin = userRole === 'ADMIN';
  const isModerator = userRole === 'MODERATOR';
  const isMember = userRole === 'MEMBER';
  
  // Yetki kontrolleri
  const canViewMembers = isAdmin || isModerator;
  const canManageMembers = isAdmin;
  const canViewResponses = isAdmin || isModerator;
  const canCreateSurveys = isAdmin || isModerator;
  const canViewSurveys = isAdmin || isModerator || isMember;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      {/* Grup Başlığı */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
            <p className="text-gray-600 mt-2">{group.description}</p>
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <span className="text-sm font-semibold text-blue-800">JoinKey: </span>
              <span className="text-blue-900 font-mono">{group.joinKey}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Admin:</div>
            <div className="font-semibold">{group.admin?.firstname} {group.admin?.lastname}</div>
          </div>
        </div>
      </div>

      {/* Tab Menüsü */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {canViewMembers && (
              <button
                onClick={() => setActiveTab('members')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'members' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Üyeler ({approvedMembers.length})
              </button>
            )}
            {canViewSurveys && (
              <button
                onClick={() => setActiveTab('surveys')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'surveys' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Anketler ({surveys.length})
              </button>
            )}
            {canManageMembers && pendingMembers.length > 0 && (
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'pending' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bekleyen Üyeler ({pendingMembers.length})
              </button>
            )}
          </nav>
        </div>

        <div className="p-6">
          {/* Üyeler Sekmesi - Admin ve Moderator görebilir */}
          {canViewMembers && activeTab === 'members' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Onaylanmış Üyeler</h3>
              {approvedMembers.length === 0 ? (
                <p className="text-gray-500">Henüz onaylanmış üye yok.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {approvedMembers.map((member) => (
                    <div key={member.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold">{member.user.firstname} {member.user.lastname}</div>
                      <div className="text-sm text-gray-600">{member.user.email}</div>
                      <div className="mt-2">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Aktif Üye
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Anketler Sekmesi */}
          {activeTab === 'surveys' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Grup Anketleri</h3>
                {canCreateSurveys && (
                  <Link 
                    to="/surveys/new" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Yeni Anket Oluştur
                  </Link>
                )}
              </div>
              {surveys.length === 0 ? (
                <p className="text-gray-500">Henüz anket oluşturulmamış.</p>
              ) : (
                <div className="space-y-4">
                  {surveys.map((survey) => (
                    <div key={survey.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{survey.title}</h4>
                          <p className="text-gray-600 mt-1">{survey.description}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            Soru sayısı: {survey.questions?.length || 0}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link 
                            to={`/surveys/${survey.id}`}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Detay
                          </Link>
                          {canViewResponses && (
                            <Link 
                              to={`/surveys/responses/${survey.id}`}
                              className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                            >
                              Cevaplar
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bekleyen Üyeler Sekmesi - Sadece admin yönetebilir */}
          {canManageMembers && activeTab === 'pending' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Onay Bekleyen Üyeler</h3>
              {pendingMembers.length === 0 ? (
                <p className="text-gray-500">Onay bekleyen üye yok.</p>
              ) : (
                <div className="space-y-4">
                  {pendingMembers.map((member) => (
                    <div key={member.id} className="bg-yellow-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{member.user.firstname} {member.user.lastname}</div>
                        <div className="text-sm text-gray-600">{member.user.email}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleApprove(member.user.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Onayla
                        </button>
                        <button 
                          onClick={() => handleReject(member.user.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Reddet
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage; 