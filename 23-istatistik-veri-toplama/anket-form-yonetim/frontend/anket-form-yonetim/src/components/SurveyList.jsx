import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import apiClient from '../services/api';

const SurveyList = () => {
  const [surveysData, setSurveysData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserSurveys = async () => {
      setLoading(true);
      setError(null);
      try {
        // Önce kullanıcının üye olduğu grupları çek
        const groupsRes = await apiClient.get('/groups/my');
        const groups = groupsRes.data;
        if (!Array.isArray(groups) || groups.length === 0) {
          setSurveysData([]);
          setLoading(false);
          return;
        }
        
        // Her grup için anketleri ve kullanıcının rolünü çek
        const allSurveysData = [];
        for (const group of groups) {
          try {
            const response = await apiClient.get(`/surveys/group/${group.id}`);
            const { surveys, userRole } = response.data;
            
            if (Array.isArray(surveys)) {
              // Her ankete kullanıcının rolünü ekle
              const surveysWithRole = surveys.map(survey => ({
                ...survey,
                userRole: userRole,
                groupId: group.id
              }));
              allSurveysData.push(...surveysWithRole);
            }
          } catch {
            // Yetkin yoksa veya hata varsa o grubun anketlerini atla
            continue;
          }
        }
        setSurveysData(allSurveysData);
      } catch {
        setError('Henüz bir gruba üye değilsiniz veya sistemde teknik bir sorun var.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserSurveys();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Bu anketi silmek istediğinizden emin misiniz?')) {
      try {
        await apiClient.delete(`/surveys/${id}`);
        // Refresh the list after deleting
        setSurveysData(surveysData.filter(s => s.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Kullanıcının anket üzerindeki yetkilerini kontrol et
  const canModifySurvey = (survey) => {
    return survey.userRole === 'ADMIN' || survey.userRole === 'MODERATOR';
  };

  const canDeleteSurvey = (survey) => {
    return survey.userRole === 'ADMIN';
  };

  const canViewResponses = (survey) => {
    return survey.userRole === 'ADMIN' || survey.userRole === 'MODERATOR';
  };

  if (loading) return <p className="text-gray-600">Anketler yükleniyor...</p>;
  if (error) return <p className="text-red-600">Hata: {error}</p>;
  if (surveysData.length === 0) return <p className="text-gray-600">Üye olduğunuz gruplara ait gösterilecek anket bulunamadı.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(surveysData) && surveysData.map((survey) => (
        <div key={survey.id} className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-between hover:shadow-lg hover:scale-105 transition-all">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{survey.title}</h2>
            <p className="text-gray-600 mt-2 mb-4">{survey.description}</p>
            {survey.userRole && (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                survey.userRole === 'ADMIN' ? 'bg-red-100 text-red-800' :
                survey.userRole === 'MODERATOR' ? 'bg-blue-100 text-blue-800' :
                survey.userRole === 'MEMBER' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {survey.userRole === 'ADMIN' ? 'Yönetici' :
                 survey.userRole === 'MODERATOR' ? 'Moderatör' :
                 survey.userRole === 'MEMBER' ? 'Üye' : 'İzleyici'}
              </span>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Link to={`/surveys/${survey.id}`} className="z-10 relative text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md">
              Anketi Görüntüle
            </Link>
            
            {canViewResponses(survey) && (
              <Link to={`/surveys/responses/${survey.id}`} className="z-10 relative text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md">
                Yanıtlar
              </Link>
            )}
            
            {canModifySurvey(survey) && (
              <Link to={`/surveys/edit/${survey.id}`} className="z-10 relative text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md">
                Düzenle
              </Link>
            )}
            
            {canDeleteSurvey(survey) && (
              <button
                onClick={() => handleDelete(survey.id)}
                className="z-10 relative text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md"
              >
                Sil
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyList; 