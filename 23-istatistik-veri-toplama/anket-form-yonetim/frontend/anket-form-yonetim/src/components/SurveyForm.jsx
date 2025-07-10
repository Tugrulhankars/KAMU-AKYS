import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const SurveyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for editing
  const isEditing = Boolean(id);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiClient.get('/groups/my');
        setGroups(response.data);
      } catch (err) {
        setError('Gruplar yüklenemedi: ' + err.message);
      } finally {
        setLoadingGroups(false);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    if (isEditing) {
      const fetchSurvey = async () => {
        try {
          const response = await apiClient.get(`/surveys/${id}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
          if (response.data.group) {
            setSelectedGroupId(response.data.group.id.toString());
          }
        } catch (err) {
          setError('Anket verileri yüklenemedi: ' + err.message);
        }
      };
      fetchSurvey();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!selectedGroupId) {
      setError('Lütfen bir grup seçin');
      setSubmitting(false);
      return;
    }

    const surveyData = { title, description };

    try {
      if (isEditing) {
        await apiClient.put(`/surveys/${id}`, surveyData);
      } else {
        await apiClient.post(`/surveys/group/${selectedGroupId}`, surveyData);
      }
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {isEditing ? 'Anketi Düzenle' : 'Yeni Anket Oluştur'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Anket Başlığı
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Açıklama
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
        </div>
        {!isEditing && (
          <div className="mb-6">
            <label htmlFor="group" className="block text-gray-700 text-sm font-bold mb-2">
              Grup Seçin
            </label>
            {loadingGroups ? (
              <div className="text-gray-500">Gruplar yükleniyor...</div>
            ) : (
              <select
                id="group"
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Grup seçin...</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          >
            {submitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm; 