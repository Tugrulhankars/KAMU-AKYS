import React, { useState } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const GroupCreatePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [joinKey, setJoinKey] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setJoinKey(null);
    try {
      const response = await apiClient.post('/groups', { name, description });
      setJoinKey(response.data.joinKey);
      setSuccess('Grup başarıyla oluşturuldu!');
      setTimeout(() => navigate('/groups'), 3000);
    } catch (err) {
      setError('Grup oluşturulamadı: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Grup Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Grup Adı</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Açıklama</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {joinKey && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
            <p className="text-sm text-blue-800 font-semibold mb-1">Grup JoinKey:</p>
            <p className="text-blue-900 bg-blue-100 p-2 rounded text-sm font-mono break-all">{joinKey}</p>
            <p className="text-xs text-blue-600 mt-1">Bu kodu paylaşarak insanları grubunuza davet edebilirsiniz.</p>
          </div>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Oluştur</button>
      </form>
    </div>
  );
};

export default GroupCreatePage; 