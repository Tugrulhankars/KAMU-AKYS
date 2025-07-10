import React, { useEffect, useState } from 'react';
import { BarChart2, Database, Users, PlusCircle, ArrowRight, Activity } from 'lucide-react';
import { datasetAPI, userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [datasetCount, setDatasetCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  // Grafik sayısı için backend yoksa, veri seti sayısı kadar gösterilecek
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const datasets = await datasetAPI.getAll();
        setDatasetCount(datasets.length);
        const users = await userAPI.getUserCount();
        setUserCount(users);
      } catch {
        setDatasetCount(0);
        setUserCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-400 text-lg">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl shadow-lg px-8 py-6 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white drop-shadow flex items-center gap-2">
          <BarChart2 className="h-8 w-8" /> Dashboard
        </h1>
        <div className="flex gap-3">
          <button onClick={() => navigate('/datasets')} className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow hover:bg-blue-50 transition-colors">
            <PlusCircle className="h-6 w-6" /> Yeni Veri Seti
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
          <Database className="h-7 w-7 text-blue-600" />
          <div className="mt-3 text-3xl font-bold text-gray-900">{datasetCount}</div>
          <div className="mt-1 text-gray-600 text-lg">Veri Seti</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
          <Users className="h-7 w-7 text-green-600" />
          <div className="mt-3 text-3xl font-bold text-gray-900">{userCount}</div>
          <div className="mt-1 text-gray-600 text-lg">Kullanıcı</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
          <BarChart2 className="h-7 w-7 text-purple-600" />
          <div className="mt-3 text-3xl font-bold text-gray-900">{datasetCount}</div>
          <div className="mt-1 text-gray-600 text-lg">Grafik</div>
        </div>
      </div>

      {/* Explore Datasets CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <a href="/datasets" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors">
          Veri Setlerini Keşfet <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default Dashboard; 