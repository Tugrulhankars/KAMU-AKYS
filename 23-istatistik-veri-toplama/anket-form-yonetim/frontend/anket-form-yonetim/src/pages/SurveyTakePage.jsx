import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const SurveyTakePage = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!surveyId) {
      setError('Geçersiz anket ID');
      setLoading(false);
      return;
    }
    const fetchSurvey = async () => {
      try {
        const res = await apiClient.get(`/surveys/${surveyId}`);
        setSurvey(res.data);
        setAnswers(res.data.questions.map(() => ''));
      } catch (err) {
        setError('Anket yüklenemedi: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [surveyId]);

  const handleChange = (qIdx, value) => {
    const updated = [...answers];
    updated[qIdx] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!surveyId) {
      setError('Geçersiz anket ID');
      return;
    }
    try {
      await apiClient.post(`/surveys/${surveyId}/responses`, {
        answers: survey.questions.map((q, idx) => ({
          questionId: q.id,
          answer: answers[idx]
        }))
      });
      setSuccess('Cevaplarınız kaydedildi!');
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setError('Cevaplar kaydedilemedi: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : survey ? (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">{survey.title}</h2>
          <div className="mb-4 text-gray-700">{survey.description}</div>
          {survey.questions.map((q, idx) => (
            <div key={q.id} className="mb-6">
              <div className="font-semibold mb-2">{q.text}</div>
              <div className="space-y-2">
                {q.choices.map((choice, cIdx) => (
                  <label key={cIdx} className="block">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={choice.text || choice}
                      checked={answers[idx] === (choice.text || choice)}
                      onChange={e => handleChange(idx, e.target.value)}
                      className="mr-2"
                      required
                    />
                    {choice.text || choice}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-600 mb-2">{success}</div>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Gönder</button>
        </form>
      ) : null}
    </div>
  );
};

export default SurveyTakePage; 