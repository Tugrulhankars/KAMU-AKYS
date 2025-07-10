import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { datasetAPI } from '../services/api';
import { Dataset, DataPoint, CreateDataPoint } from '../types';
import { Database, Users, BarChart2, Edit, Trash2, Share2, PlusCircle, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DatasetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', category: '' });
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState<CreateDataPoint>({ key: '', value: 0, date: '', category: '' });
  const [addError, setAddError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '', isPublic: false });
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingDataPointId, setEditingDataPointId] = useState<number | null>(null);
  const [editDataPointForm, setEditDataPointForm] = useState<CreateDataPoint>({ key: '', value: 0, date: '', category: '' });
  const [editDataPointLoading, setEditDataPointLoading] = useState(false);
  const [csvData, setCsvData] = useState<any[][]>([]);
  const [csvError, setCsvError] = useState<string | null>(null);

  // Dummy auth (gerçek projede context ile alınmalı)
  const user = JSON.parse(localStorage.getItem('auth-user') || 'null');
  const isOwnerOrAdmin = user && (user.username === dataset?.createdByUsername || user.role === 'Admin');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const ds = await datasetAPI.getById(Number(id));
        setDataset(ds);
      } catch (err: any) {
        setError(err.message || 'Veri seti bulunamadı');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const fetchData = async () => {
    try {
      const d = await datasetAPI.getData(Number(id), filters);
      setData(d);
    } catch (err: any) {
      setData([]);
    }
  };

  useEffect(() => {
    if (dataset) fetchData();
    // eslint-disable-next-line
  }, [dataset, filters]);

  useEffect(() => {
    if (dataset && editMode) {
      setEditForm({ name: dataset.name, description: dataset.description, isPublic: dataset.isPublic });
    }
  }, [dataset, editMode]);

  useEffect(() => {
    if (dataset && dataset.FileUrl) {
      fetch(dataset.FileUrl)
        .then(res => res.text())
        .then(text => {
          const parsed = Papa.parse(text, { skipEmptyLines: true });
          if (parsed.errors.length > 0) {
            setCsvError('CSV dosyası okunamadı.');
            setCsvData([]);
          } else {
            setCsvData(parsed.data.slice(0, 100));
            setCsvError(null);
          }
        })
        .catch(() => {
          setCsvError('CSV dosyası alınamadı.');
          setCsvData([]);
        });
    }
  }, [dataset]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    try {
      await datasetAPI.addDataPoint(Number(id), addForm);
      setAddForm({ key: '', value: 0, date: '', category: '' });
      setAdding(false);
      fetchData();
    } catch (err: any) {
      setAddError(err.message || 'Veri eklenemedi');
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, isPublic: e.target.checked });
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const updated = await datasetAPI.update(Number(id), editForm);
      setDataset(updated);
      setEditMode(false);
      toast.success('Veri seti güncellendi');
    } catch (err: any) {
      toast.error(err.message || 'Güncelleme başarısız');
    } finally {
      setEditLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm('Bu veri setini silmek istediğinize emin misiniz?')) return;
    setDeleteLoading(true);
    try {
      await datasetAPI.delete(Number(id));
      toast.success('Veri seti silindi');
      navigate('/datasets');
    } catch (err: any) {
      toast.error(err.message || 'Silme başarısız');
    } finally {
      setDeleteLoading(false);
    }
  };
  // DataPoint düzenleme/silme
  const handleEditDataPoint = (dp: DataPoint) => {
    setEditingDataPointId(dp.id);
    setEditDataPointForm({ key: dp.key, value: dp.value, date: dp.date.slice(0, 10), category: dp.category || '' });
  };
  const handleEditDataPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPointForm({ ...editDataPointForm, [e.target.name]: e.target.value });
  };
  const handleEditDataPointSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDataPointId) return;
    setEditDataPointLoading(true);
    try {
      await datasetAPI.updateDataPoint(Number(id), editingDataPointId, editDataPointForm);
      toast.success('Veri güncellendi');
      setEditingDataPointId(null);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Veri güncellenemedi');
    } finally {
      setEditDataPointLoading(false);
    }
  };
  const handleDeleteDataPoint = async (dataPointId: number) => {
    if (!window.confirm('Bu veriyi silmek istediğinize emin misiniz?')) return;
    try {
      await datasetAPI.deleteDataPoint(Number(id), dataPointId);
      toast.success('Veri silindi');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Veri silinemedi');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400 text-lg">Yükleniyor...</div>;
  if (error || !dataset) return <div className="text-center py-20 text-red-500 text-lg">{error || 'Veri seti bulunamadı.'}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <Database className="h-8 w-8 text-blue-600" /> {dataset.name}
          </h1>
          <p className="text-gray-700 mb-4">{dataset.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>Oluşturan: <b>{dataset.createdByUsername}</b></span>
            <span>Oluşturulma: {new Date(dataset.createdAt).toLocaleDateString('tr-TR')}</span>
            <span className={dataset.isPublic ? 'text-green-600' : 'text-gray-600'}>
              {dataset.isPublic ? 'Kamuya Açık' : 'Özel'}
            </span>
          </div>
          {/* Filters */}
          <form className="flex flex-wrap gap-4 mb-6 items-end" onSubmit={e => { e.preventDefault(); fetchData(); }}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Başlangıç Tarihi</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bitiş Tarihi</label>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Kategori</label>
              <input type="text" name="category" value={filters.category} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Kategori" />
            </div>
            <button type="submit" className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <Filter className="h-4 w-4" /> Filtrele
            </button>
          </form>
          {/* Data Table */}
          <div className="overflow-x-auto rounded-lg border mb-8">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-700">Anahtar</th>
                  <th className="px-4 py-2 font-semibold text-gray-700">Değer</th>
                  <th className="px-4 py-2 font-semibold text-gray-700">Tarih</th>
                  <th className="px-4 py-2 font-semibold text-gray-700">Kategori</th>
                  {isOwnerOrAdmin && <th className="px-4 py-2"></th>}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400">Veri bulunamadı.</td></tr>
                ) : data.map((row, i) => (
                  <tr key={i} className="border-t">
                    {editingDataPointId === row.id ? (
                      <>
                        <td colSpan={5}>
                          <form onSubmit={handleEditDataPointSubmit} className="flex flex-wrap gap-2 items-end">
                            <input name="key" value={editDataPointForm.key} onChange={handleEditDataPointChange} required className="px-2 py-1 border rounded" />
                            <input name="value" type="number" value={editDataPointForm.value} onChange={handleEditDataPointChange} required className="px-2 py-1 border rounded" />
                            <input name="date" type="date" value={editDataPointForm.date} onChange={handleEditDataPointChange} required className="px-2 py-1 border rounded" />
                            <input name="category" value={editDataPointForm.category} onChange={handleEditDataPointChange} className="px-2 py-1 border rounded" />
                            <button type="submit" disabled={editDataPointLoading} className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60">Kaydet</button>
                            <button type="button" onClick={() => setEditingDataPointId(null)} className="text-gray-500 ml-2">İptal</button>
                          </form>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{row.key}</td>
                        <td className="px-4 py-2">{row.value}</td>
                        <td className="px-4 py-2">{new Date(row.date).toLocaleDateString('tr-TR')}</td>
                        <td className="px-4 py-2">{row.category || '-'}</td>
                        {isOwnerOrAdmin && (
                          <td className="px-4 py-2 flex gap-2">
                            <button onClick={() => handleEditDataPoint(row)} className="text-blue-600 hover:underline text-xs">Düzenle</button>
                            <button onClick={() => handleDeleteDataPoint(row.id)} className="text-red-600 hover:underline text-xs">Sil</button>
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Veri Ekleme Formu */}
          {isOwnerOrAdmin && (
            <div className="mb-4">
              {adding ? (
                <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end bg-blue-50 p-4 rounded-xl">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Anahtar</label>
                    <input name="key" value={addForm.key} onChange={handleAddChange} required className="px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Değer</label>
                    <input name="value" type="number" value={addForm.value} onChange={handleAddChange} required className="px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tarih</label>
                    <input name="date" type="date" value={addForm.date} onChange={handleAddChange} required className="px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Kategori</label>
                    <input name="category" value={addForm.category} onChange={handleAddChange} className="px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <button type="submit" disabled={addLoading} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60">
                    <PlusCircle className="h-4 w-4" /> {addLoading ? 'Ekleniyor...' : 'Ekle'}
                  </button>
                  <button type="button" onClick={() => setAdding(false)} className="ml-2 text-gray-500 hover:text-red-600">İptal</button>
                  {addError && <div className="w-full text-red-600 text-sm mt-2">{addError}</div>}
                </form>
              ) : (
                <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors">
                  <PlusCircle className="h-5 w-5" /> Veri Ekle
                </button>
              )}
            </div>
          )}
          {/* CSV Tablo */}
          {dataset?.FileUrl && (
            <div className="my-8">
              <h2 className="text-xl font-bold mb-2">Veri Dosyası (CSV)</h2>
              {csvError && <div className="text-red-600 mb-2">{csvError}</div>}
              {csvData.length > 0 && (
                <div className="overflow-x-auto rounded-lg border mb-4">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        {csvData[0].map((h: any, i: number) => (
                          <th key={i} className="px-4 py-2 font-semibold text-gray-700">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.slice(1).map((row: any[], i: number) => (
                        <tr key={i} className="border-t">
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-2">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Basit Bar Chart */}
              {csvData.length > 1 && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-bold mb-2">Örnek Grafik</h3>
                  <Bar
                    data={{
                      labels: csvData.slice(1, 11).map((row: any[]) => row[0]),
                      datasets: [
                        {
                          label: csvData[0][1] || 'Değer',
                          data: csvData.slice(1, 11).map((row: any[]) => Number(row[1]) || 0),
                          backgroundColor: 'rgba(37,99,235,0.6)'
                        }
                      ]
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {/* Actions Sidebar */}
        <div className="w-full md:w-56 flex flex-col gap-4">
          {isOwnerOrAdmin && !editMode && (
            <>
              <button onClick={() => setEditMode(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors">
                <Edit className="h-5 w-5" /> Düzenle
              </button>
              <button onClick={handleDelete} disabled={deleteLoading} className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-200 transition-colors disabled:opacity-60">
                <Trash2 className="h-5 w-5" /> {deleteLoading ? 'Siliniyor...' : 'Sil'}
              </button>
            </>
          )}
          {isOwnerOrAdmin && editMode && (
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 bg-blue-50 p-4 rounded-xl">
              <label className="text-xs font-medium text-gray-700">Ad</label>
              <input name="name" value={editForm.name} onChange={handleEditChange} required className="px-2 py-1 border rounded" />
              <label className="text-xs font-medium text-gray-700">Açıklama</label>
              <textarea name="description" value={editForm.description} onChange={handleEditChange} required className="px-2 py-1 border rounded" />
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={editForm.isPublic} onChange={handleEditCheckbox} /> Kamuya Açık
              </label>
              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={editLoading} className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60">Kaydet</button>
                <button type="button" onClick={() => setEditMode(false)} className="text-gray-500">İptal</button>
              </div>
            </form>
          )}
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition-colors">
            <Share2 className="h-5 w-5" /> Paylaş
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail; 