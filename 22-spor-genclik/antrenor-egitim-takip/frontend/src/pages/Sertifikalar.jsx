import React, { useEffect, useState } from 'react';
import { sertifikaAPI } from '../services/api';

const Sertifikalar = () => {
  const [sertifikalar, setSertifikalar] = useState([]);
  const [yeniSertifika, setYeniSertifika] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchSertifikalar = async () => {
    setLoading(true);
    try {
      const res = await sertifikaAPI.getAll();
      setSertifikalar(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSertifikalar();
  }, []);

  const handleChange = (e) => {
    setYeniSertifika({ ...yeniSertifika, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await sertifikaAPI.create(yeniSertifika);
    setYeniSertifika({ name: '', description: '' });
    fetchSertifikalar();
  };

  const handleDelete = async (id) => {
    await sertifikaAPI.delete(id);
    fetchSertifikalar();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sertifikalar</h2>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input name="name" value={yeniSertifika.name} onChange={handleChange} placeholder="Sertifika Adı" className="border p-2" required />
        <input name="description" value={yeniSertifika.description} onChange={handleChange} placeholder="Açıklama" className="border p-2" />
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
            {sertifikalar.map((sertifika) => (
              <tr key={sertifika.id}>
                <td className="border px-2">{sertifika.id}</td>
                <td className="border px-2">{sertifika.name}</td>
                <td className="border px-2">{sertifika.description}</td>
                <td className="border px-2">
                  <button onClick={() => handleDelete(sertifika.id)} className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sertifikalar; 