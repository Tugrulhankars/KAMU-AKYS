import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import apiClient from '../services/api';
import QuestionList from '../components/QuestionList';
import QuestionForm from '../components/QuestionForm';

const SurveyDetailPage = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [userRole, setUserRole] = useState('NONE');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchSurvey = useCallback(async () => {
    if (!id) {
      setError('Geçersiz anket ID');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await apiClient.get(`/surveys/${id}`);
      setSurveyData(response.data.survey);
      setUserRole(response.data.userRole || 'NONE');
    } catch (err) {
      setError('Anket yüklenirken bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      fetchSurvey();
    } else {
      setLoading(false);
    }
  }, [fetchSurvey, user]);

  const handleQuestionAdd = async (questionData) => {
    try {
      await apiClient.post(`/surveys/${id}/questions`, questionData);
      fetchSurvey();
    } catch (err) {
      setError('Soru eklenirken bir hata oluştu: ' + err.message);
    }
  };
  
  const handleQuestionDelete = async (questionId) => {
     if (window.confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
        try {
            await apiClient.delete(`/questions/${questionId}`);
            fetchSurvey();
        } catch (err) {
            setError('Soru silinirken bir hata oluştu: ' + err.message);
        }
     }
  };

  const handleChoiceAdd = async (questionId, choiceData) => {
    try {
      await apiClient.post(`/questions/${questionId}/choices`, choiceData);
      fetchSurvey();
    } catch (err) {
      setError('Seçenek eklenirken bir hata oluştu: ' + err.message);
    }
  };

  const handleChoiceDelete = async (questionId, choiceId) => {
    if (window.confirm('Bu seçeneği silmek istediğinizden emin misiniz?')) {
      try {
        await apiClient.delete(`/choices/${choiceId}`);
        fetchSurvey();
      } catch (err) {
        setError('Seçenek silinirken bir hata oluştu: ' + err.message);
      }
    }
  };

  const handleAnswerChange = (questionId, value, choiceId = null) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { value, choiceId }
    }));
  };

  const handleSubmit = async () => {
    try {
      const responseData = {
        surveyId: parseInt(id),
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          textAnswer: answer.choiceId ? null : answer.value,
          choiceId: answer.choiceId
        }))
      };

      await apiClient.post('/survey-responses', responseData);
      alert('Anket yanıtınız başarıyla gönderildi!');
      setIsAnswering(false);
      setAnswers({});
    } catch (err) {
      setError('Anket gönderilirken bir hata oluştu: ' + err.message);
    }
  };

  const canModify = userRole === 'ADMIN' || userRole === 'MODERATOR';
  const canAnswer = userRole !== 'NONE' && userRole !== undefined;
  const canViewResponses = userRole === 'ADMIN' || userRole === 'MODERATOR';

  if (loading) return <p className="text-center text-gray-600">Yükleniyor...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!surveyData) return <p className="text-center text-gray-600">Anket bulunamadı.</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{surveyData.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{surveyData.description}</p>
          {userRole && (
            <p className="text-sm text-blue-600 mt-1">
              Rolünüz: {userRole === 'ADMIN' ? 'Yönetici' : 
                       userRole === 'MODERATOR' ? 'Moderatör' : 
                       userRole === 'MEMBER' ? 'Üye' : 
                       userRole === 'VIEWER' ? 'İzleyici' : 'Misafir'}
            </p>
          )}
        </div>
        <div className="flex space-x-3">
          {canAnswer && !isAnswering && (
            <button
              onClick={() => setIsAnswering(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Anketi Cevapla
            </button>
          )}
          {canViewResponses && (
            <button
              onClick={() => navigate(`/surveys/responses/${id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Yanıtları Görüntüle
            </button>
          )}
          {canModify && (
            <button
              onClick={() => navigate(`/surveys/edit/${id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Düzenle
            </button>
          )}
        </div>
      </div>
      
      {user && (
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sorular</h2>
          
          {/* Anket Cevaplama Modu */}
          {isAnswering && (
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-800">Anket Cevaplanıyor</h3>
                <button
                  onClick={() => {
                    setIsAnswering(false);
                    setAnswers({});
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  İptal
                </button>
              </div>
              
              {surveyData.questions.map((question) => (
                <div key={question.id} className="mb-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-medium text-gray-800 mb-3">{question.questionText}</h4>
                  
                  {question.questionType === 'MULTIPLE_CHOICE' ? (
                    <div className="space-y-2">
                      {question.choices.map((choice) => (
                        <label key={choice.id} className="flex items-center">
                          <input
                            type="radio"
                            name={`question_${question.id}`}
                            value={choice.id}
                            onChange={(e) => handleAnswerChange(question.id, choice.choiceText, parseInt(e.target.value))}
                            className="mr-2"
                          />
                          <span>{choice.choiceText}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={answers[question.id]?.value || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows="3"
                      placeholder="Cevabınızı yazın..."
                    />
                  )}
                </div>
              ))}
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsAnswering(false);
                    setAnswers({});
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Gönder
                </button>
              </div>
            </div>
          )}
          
          {/* Soru Düzenleme (Sadece Admin/Moderator) */}
          {canModify && !isAnswering && (
            <>
              <QuestionForm onQuestionAdd={handleQuestionAdd} />
              <div className="mt-8">
                <QuestionList 
                  questions={surveyData.questions} 
                  onQuestionDelete={handleQuestionDelete}
                  onChoiceAdd={handleChoiceAdd}
                  onChoiceDelete={handleChoiceDelete}
                  canModify={true}
                />
              </div>
            </>
          )}
          
          {/* Sadece Soru Görüntüleme (Member/Viewer) */}
          {!canModify && userRole !== 'NONE' && !isAnswering && (
            <div className="mt-8">
              <QuestionList 
                questions={surveyData.questions} 
                onQuestionDelete={() => {}}
                onChoiceAdd={() => {}}
                onChoiceDelete={() => {}}
                canModify={false}
              />
            </div>
          )}
        </div>
      )}
      
      {!user && (
        <div className="border-t pt-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Anket İçeriği</h2>
            <p className="text-gray-600 mb-6">
              Bu anketin sorularını görüntülemek ve düzenlemek için giriş yapmanız gerekmektedir.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Kayıt Ol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyDetailPage; 