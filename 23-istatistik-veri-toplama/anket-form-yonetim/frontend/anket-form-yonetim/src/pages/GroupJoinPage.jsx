import React, { useState } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const GroupJoinPage = () => {
  const [joinKey, setJoinKey] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await apiClient.post('/groups/join-with-key', null, { params: { joinKey } });
      setSuccess('Başvuru alındı, onay bekleniyor!');
      setTimeout(() => navigate('/groups'), 1500);
    } catch (err) {
      setError('Katılım başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">JoinKey ile Gruba Katıl</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">JoinKey</label>
          <input type="text" value={joinKey} onChange={e => setJoinKey(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Katıl</button>
      </form>
    </div>
  );
};

export default GroupJoinPage; 