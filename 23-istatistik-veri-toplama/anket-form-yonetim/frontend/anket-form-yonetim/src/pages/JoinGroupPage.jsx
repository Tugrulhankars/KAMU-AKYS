import React, { useState } from 'react';
import apiClient from '../services/api';

export default function JoinGroupPage() {
  const [joinKey, setJoinKey] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await apiClient.post('/groups/join-with-key', null, {
        params: { joinKey }
      });
      
      setMessage('Başvurunuz başarıyla iletildi. Admin onayından sonra gruba katılacaksınız.');
      setJoinKey('');
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data);
      } else {
        setMessage('Bir hata oluştu. Lütfen grup anahtarını kontrol edin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gruba Katıl</h2>
      <form onSubmit={handleJoin}>
        <label className="block mb-2 font-medium">Grup ID / Katılım Anahtarı</label>
        <input
          type="text"
          value={joinKey}
          onChange={e => setJoinKey(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Grup ID veya Katılım Anahtarı girin"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Katılıyor...' : 'Katıl'}
        </button>
      </form>
      {message && <div className="mt-4 text-center text-sm text-gray-700">{message}</div>}
    </div>
  );
} 