import React, { useEffect, useState } from 'react';
import { egitimAPI } from '../services/api';

const Egitimler = () => {
  const [egitimler, setEgitimler] = useState([]);
  const [yeniEgitim, setYeniEgitim] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchEgitimler = async () => {
    setLoading(true);
    try {
      const res = await egitimAPI.getAll();
      setEgitimler(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEgitimler();
  }, []);

  const handleChange = (e) => {
    setYeniEgitim({ ...yeniEgitim, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await egitimAPI.create(yeniEgitim);
    setYeniEgitim({ name: '', description: '' });
    fetchEgitimler();
  };

  const handleDelete = async (id) => {
    await egitimAPI.delete(id);
    fetchEgitimler();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Eğitimler</h2>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input name="name" value={yeniEgitim.name} onChange={handleChange} placeholder="Eğitim Adı" className="border p-2" required />
        <input name="description" value={yeniEgitim.description} onChange={handleChange} placeholder="Açıklama" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ekle</button>
      </form>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">Ad</th>
              <th className="border px-2">Açıklama</th>
              <th className="border px-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {egitimler.map((egitim) => (
              <tr key={egitim.id}>
                <td className="border px-2">{egitim.id}</td>
                <td className="border px-2">{egitim.name}</td>
                <td className="border px-2">{egitim.description}</td>
                <td className="border px-2">
                  <button onClick={() => handleDelete(egitim.id)} className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Egitimler; 