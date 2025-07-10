import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { useParams } from 'react-router-dom';

const SurveyResponsesPage = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError('Geçersiz anket ID');
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const surveyRes = await apiClient.get(`/surveys/${id}`);
        setSurvey(surveyRes.data.survey || surveyRes.data);
        const res = await apiClient.get(`/survey-responses/survey/${id}`);
        setResponses(res.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Cevaplar yüklenemedi: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      {loading ? (
        <div className="text-center text-gray-600">Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500 text-center bg-red-50 p-4 rounded-lg">{error}</div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {survey?.title} - Yanıtlar
          </h2>
          <div className="mb-4 text-center text-gray-600">
            Toplam {responses.length} yanıt bulundu
          </div>
          
          {responses.length === 0 ? (
            <div className="text-center text-gray-500 bg-gray-50 p-8 rounded-lg">
              Bu ankete henüz yanıt verilmedi.
            </div>
          ) : (
            <div className="space-y-6">
              {responses.map((resp, idx) => (
                <div key={resp.id || idx} className="border rounded-lg p-6 bg-white shadow-sm">
                  <div className="mb-4 text-gray-600 text-sm border-b pb-2">
                    <span className="font-medium">Yanıtlayan:</span> {resp.user?.firstname} {resp.user?.lastname} 
                    <span className="ml-2">({resp.user?.email})</span>
                    {resp.submittedAt && (
                      <span className="ml-4 text-gray-500">
                        Tarih: {new Date(resp.submittedAt).toLocaleString('tr-TR')}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {resp.answers && resp.answers.length > 0 ? (
                      resp.answers.map((ans, aIdx) => (
                        <div key={aIdx} className="bg-gray-50 p-3 rounded">
                          <div className="font-semibold text-gray-800 mb-1">
                            {ans.questionText || ans.question?.questionText || `Soru ${aIdx + 1}`}:
                          </div>
                          <div className="text-gray-700">
                            {ans.answerText || ans.textAnswer || 
                             (ans.choice?.choiceText) || 
                             (ans.choiceId ? `Seçenek ID: ${ans.choiceId}` : 'Yanıt bulunamadı')}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 italic">Bu yanıtta cevap bulunamadı.</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SurveyResponsesPage; 