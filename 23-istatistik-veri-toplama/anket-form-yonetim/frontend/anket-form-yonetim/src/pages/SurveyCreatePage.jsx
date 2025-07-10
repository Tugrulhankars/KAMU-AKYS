import React, { useState } from 'react';
import apiClient from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const SurveyCreatePage = () => {
  const { groupId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'MULTIPLE_CHOICE', choices: [''] }
  ]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].text = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (qIdx, cIdx, value) => {
    const updated = [...questions];
    updated[qIdx].choices[cIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'MULTIPLE_CHOICE', choices: [''] }]);
  };

  const addChoice = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].choices.push('');
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      // Backend çoktan seçmeli soruları ve seçenekleri desteklemeli!
      await apiClient.post(`/surveys/group/${groupId}`, {
        title,
        description,
        questions: questions.map(q => ({
          text: q.text,
          type: q.type,
          choices: q.choices.filter(c => c.trim() !== '')
        }))
      });
      setSuccess('Anket başarıyla oluşturuldu!');
      setTimeout(() => navigate(`/groups/${groupId}`), 1500);
    } catch (err) {
      setError('Anket oluşturulamadı: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Anket Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Başlık</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Açıklama</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Sorular</label>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 border rounded p-3 bg-gray-50">
              <input type="text" value={q.text} onChange={e => handleQuestionChange(idx, e.target.value)} placeholder={`Soru ${idx + 1}`} required className="w-full border rounded px-2 py-1 mb-2" />
              <div className="ml-2 mb-2">
                <span className="text-sm font-semibold">Çoktan Seçmeli Seçenekler:</span>
                {q.choices.map((c, cIdx) => (
                  <div key={cIdx} className="flex items-center mb-1">
                    <input type="text" value={c} onChange={e => handleChoiceChange(idx, cIdx, e.target.value)} placeholder={`Seçenek ${cIdx + 1}`} required className="border rounded px-2 py-1 mr-2" />
                  </div>
                ))}
                <button type="button" onClick={() => addChoice(idx)} className="text-blue-600 text-xs underline">Seçenek Ekle</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="bg-gray-200 px-3 py-1 rounded text-sm">Soru Ekle</button>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Oluştur</button>
      </form>
    </div>
  );
};

export default SurveyCreatePage; 