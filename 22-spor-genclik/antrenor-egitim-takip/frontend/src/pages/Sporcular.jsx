import React, { useEffect, useState } from 'react';
import { sporcuAPI } from '../services/api';

const Sporcular = () => {
  const [sporcular, setSporcular] = useState([]);
  const [yeniSporcu, setYeniSporcu] = useState({ athleteNumber: '', sport: '' });
  const [loading, setLoading] = useState(false);

  const fetchSporcular = async () => {
    setLoading(true);
    try {
      const res = await sporcuAPI.getAll();
      setSporcular(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSporcular();
  }, []);

  const handleChange = (e) => {
    setYeniSporcu({ ...yeniSporcu, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await sporcuAPI.create(yeniSporcu);
    setYeniSporcu({ athleteNumber: '', sport: '' });
    fetchSporcular();
  };

  const handleDelete = async (id) => {
    await sporcuAPI.delete(id);
    fetchSporcular();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sporcular</h2>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input name="athleteNumber" value={yeniSporcu.athleteNumber} onChange={handleChange} placeholder="Sporcu No" className="border p-2" required />
        <input name="sport" value={yeniSporcu.sport} onChange={handleChange} placeholder="Branş" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ekle</button>
      </form>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">Sporcu No</th>
              <th className="border px-2">Branş</th>
              <th className="border px-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {sporcular.map((s) => (
              <tr key={s.id}>
                <td className="border px-2">{s.id}</td>
                <td className="border px-2">{s.athleteNumber}</td>
                <td className="border px-2">{s.sport}</td>
                <td className="border px-2">
                  <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sporcular; 