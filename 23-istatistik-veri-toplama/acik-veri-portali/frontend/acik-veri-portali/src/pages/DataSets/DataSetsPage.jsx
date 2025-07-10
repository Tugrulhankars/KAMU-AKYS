import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { dataSetAPI } from '../../services/api';

const DataSetsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dataSets, setDataSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', file: null });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchDataSets();
  }, [isAuthenticated]);

  const fetchDataSets = async () => {
    setLoading(true);
    try {
      const res = await dataSetAPI.getAll();
      setDataSets(res.data);
    } catch {
      setDataSets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    setFormError('');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Başlık zorunludur');
      return;
    }
    if (!form.file) {
      setFormError('CSV dosyası yüklemelisiniz');
      return;
    }
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('file', form.file);
    try {
      await dataSetAPI.upload(formData);
      setShowForm(false);
      setForm({ title: '', description: '', file: null });
      fetchDataSets();
    } catch (err) {
      setFormError('Veri seti eklenemedi.');
    }
  };

  return (
    <div className="pt-20 pb-12 container-custom">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Veri Setleri</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'İptal' : 'Yeni Veri Seti Ekle'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 bg-white p-4 rounded shadow">
          <div className="mb-2">
            <label className="block mb-1">Başlık</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="input w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Açıklama</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="input w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">CSV Dosyası</label>
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleInputChange}
              className="input w-full"
              required
            />
          </div>
          {formError && <div className="text-red-600 mb-2">{formError}</div>}
          <button type="submit" className="btn-primary">Kaydet</button>
        </form>
      )}
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataSets.length === 0 ? (
            <div className="col-span-full text-gray-500">Veri seti bulunamadı.</div>
          ) : (
            dataSets.map(ds => (
              <div key={ds.id} className="bg-white rounded shadow p-4">
                <h2 className="font-bold text-lg mb-1">{ds.title}</h2>
                <p className="text-gray-600 mb-2">{ds.description}</p>
                <div className="text-xs text-gray-400 mb-2">Oluşturulma: {ds.createdAt ? new Date(ds.createdAt).toLocaleString() : '-'}</div>
                {ds.filePath && (
                  <button
                    className="btn-secondary text-sm"
                    onClick={async () => {
                      const res = await dataSetAPI.download(ds.id);
                      const url = window.URL.createObjectURL(new Blob([res.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', ds.title + '.csv');
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                    }}
                  >
                    CSV İndir
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DataSetsPage; 