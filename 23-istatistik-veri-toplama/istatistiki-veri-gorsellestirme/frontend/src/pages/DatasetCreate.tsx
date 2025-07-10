import React, { useState } from 'react';
import { Database, CheckCircle } from 'lucide-react';
import { datasetAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface DatasetCreateProps {
  onDatasetAdded?: () => void;
}

const DatasetCreate: React.FC<DatasetCreateProps> = ({ onDatasetAdded }) => {
  const [form, setForm] = useState({ name: '', description: '', isPublic: false });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Lütfen bir dosya seçin!');
      return;
    }
    try {
      const result = await datasetAPI.upload({
        name: form.name,
        description: form.description,
        isPublic: form.isPublic,
        file,
      });
      setSubmitted(true);
      toast.success('Veri seti başarıyla yüklendi!');
      if (onDatasetAdded) {
        onDatasetAdded();
      }
      if (result.datasetId) {
        setTimeout(() => navigate(`/dataset/${result.datasetId}`), 1000);
      } else {
        setTimeout(() => navigate('/datasets'), 1000);
      }
    } catch (err: any) {
      toast.error(err.message || 'Yükleme sırasında hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Database className="h-8 w-8 text-blue-600" /> Yeni Veri Seti Oluştur
        </h1>
        <p className="text-gray-600 mb-8">Yeni bir veri seti ekleyin ve analiz için paylaşın.</p>
        {submitted ? (
          <div className="flex flex-col items-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Veri seti başarıyla oluşturuldu!</h2>
            <p className="text-gray-700 mb-4">Artık veri ekleyebilir veya detay sayfasına gidebilirsiniz.</p>
            <a href="/datasets" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">Veri Setlerine Dön</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Veri Seti Adı</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Nüfus İstatistikleri 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Veri seti hakkında açıklama..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Veri Dosyası (CSV, XLSX, JSON vb.)</label>
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.json,.txt"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {file && <div className="text-xs text-gray-600 mt-1">Seçilen dosya: <b>{file.name}</b></div>}
            </div>
            <div className="flex items-center">
              <input
                name="isPublic"
                type="checkbox"
                checked={form.isPublic}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Bu veri setini kamuya açık yap</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Database className="h-5 w-5" /> Oluştur
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DatasetCreate; 