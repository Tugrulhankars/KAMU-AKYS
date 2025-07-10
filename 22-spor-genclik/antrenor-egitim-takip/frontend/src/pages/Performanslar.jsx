import React, { useEffect, useState } from 'react';
import { performansAPI } from '../services/api';

const Performanslar = () => {
  const [performanslar, setPerformanslar] = useState([]);
  const [yeniPerformans, setYeniPerformans] = useState({ score: '', level: '' });
  const [loading, setLoading] = useState(false);

  const fetchPerformanslar = async () => {
    setLoading(true);
    try {
      const res = await performansAPI.getAll();
      setPerformanslar(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanslar();
  }, []);

  const handleChange = (e) => {
    setYeniPerformans({ ...yeniPerformans, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await performansAPI.create(yeniPerformans);
    setYeniPerformans({ score: '', level: '' });
    fetchPerformanslar();
  };

  const handleDelete = async (id) => {
    await performansAPI.delete(id);
    fetchPerformanslar();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Performanslar</h2>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input name="score" value={yeniPerformans.score} onChange={handleChange} placeholder="Puan" className="border p-2" required />
        <input name="level" value={yeniPerformans.level} onChange={handleChange} placeholder="Seviye" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ekle</button>
      </form>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">Puan</th>
              <th className="border px-2">Seviye</th>
              <th className="border px-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {performanslar.map((p) => (
              <tr key={p.id}>
                <td className="border px-2">{p.id}</td>
                <td className="border px-2">{p.score}</td>
                <td className="border px-2">{p.level}</td>
                <td className="border px-2">
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Performanslar; 