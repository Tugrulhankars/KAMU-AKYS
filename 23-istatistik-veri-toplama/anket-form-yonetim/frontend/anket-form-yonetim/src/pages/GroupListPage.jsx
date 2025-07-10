import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { Link } from 'react-router-dom';

const GroupListPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Kullanıcının üye olduğu grupları getir
        const res = await apiClient.get('/groups/my');
        setGroups(res.data);
      } catch (err) {
        setError('Gruplar yüklenemedi: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gruplarım</h2>
        <Link to="/groups/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Yeni Grup Oluştur</Link>
      </div>
      <Link to="/groups/join" className="text-blue-600 underline mb-4 inline-block">JoinKey ile Gruba Katıl</Link>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : groups.length === 0 ? (
        <div>Henüz bir gruba üye değilsiniz.</div>
      ) : (
        <ul className="space-y-4">
          {groups.map(group => (
            <li key={group.id} className="border rounded p-4 flex justify-between items-center">
              <div>
                <div className="font-bold text-lg">{group.name}</div>
                <div className="text-gray-600">{group.description}</div>
                <div className="text-xs text-gray-400">JoinKey: {group.joinKey}</div>
              </div>
              <Link to={`/groups/${group.id}`} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Grup Detay</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupListPage; 