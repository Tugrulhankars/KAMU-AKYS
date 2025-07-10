import React, { useEffect, useState } from 'react';
import { datasetAPI } from '../services/api';
import { Database, Users, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Dataset } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import DatasetCreate from './DatasetCreate';

const Datasets: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await datasetAPI.getAll();
      setDatasets(data);
    } catch (err: any) {
      setError(err.message || 'Veri setleri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu veri setini silmek istediğinize emin misiniz?')) return;
    setDeleteLoadingId(id);
    try {
      await datasetAPI.delete(id);
      toast.success('Veri seti silindi');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Silme başarısız');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleDatasetAdded = () => {
    setShowModal(false);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="h-8 w-8 text-blue-600" /> Veri Setleri
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Database className="h-5 w-5" /> Yeni Veri Seti Ekle
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl relative">
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-2xl">&times;</button>
              <DatasetCreate onDatasetAdded={handleDatasetAdded} />
            </div>
          </div>
        )}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Yükleniyor...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 text-lg">{error}</div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">Hiç veri seti bulunamadı.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {datasets.map(ds => {
              const isOwner = user && user.username === ds.createdByUsername;
              return (
                <div
                  key={ds.id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-xl transition-shadow group border relative"
                >
                  <Link
                    to={`/datasets/${ds.id}`}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <Database className="h-5 w-5" /> {ds.name}
                      {ds.isPublic ? (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Kamuya Açık</span>
                      ) : (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">Özel</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm flex-1">{ds.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>Oluşturan: <b>{ds.createdByUsername}</b></span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4 text-blue-400" /> {ds.dataPointsCount} veri</span>
                    </div>
                    <div className="flex justify-end mt-2">
                      <span className="inline-flex items-center gap-1 text-blue-600 font-medium group-hover:underline">
                        Detay <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                  {(isOwner || isAdmin) && (
                    <div className="flex gap-2 mt-2 absolute top-4 right-4">
                      <Link to={`/datasets/${ds.id}`} className="text-blue-600 hover:underline flex items-center gap-1 text-xs">
                        <Edit className="h-4 w-4" /> Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(ds.id)}
                        disabled={deleteLoadingId === ds.id}
                        className="text-red-600 hover:underline flex items-center gap-1 text-xs disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" /> {deleteLoadingId === ds.id ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Datasets; 