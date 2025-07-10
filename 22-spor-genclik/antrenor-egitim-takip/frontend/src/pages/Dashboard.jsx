import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  Calendar,
  Bell,
  MoreHorizontal,
  Activity,
  Plus,
  RefreshCw,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { antrenorAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAntrenorler: 0,
    aktifAntrenorler: 0,
    toplamEgitimler: 0,
    devamEdenEgitimler: 0,
    toplamSertifikalar: 0,
    gecerlilikSuresiYaklasan: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.roles?.includes('Admin') || user?.roles?.includes('Yonetici');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Antrenör istatistikleri
      const [antrenorlerResponse, aktifAntrenorlerResponse] = await Promise.all([
        antrenorAPI.getAll(),
        antrenorAPI.getAktif()
      ]);

      const totalAntrenorler = antrenorlerResponse.data.data?.length || 0;
      const aktifAntrenorler = aktifAntrenorlerResponse.data.data?.length || 0;

      setStats({
        totalAntrenorler,
        aktifAntrenorler,
        toplamEgitimler: 25, // Mock data
        devamEdenEgitimler: 8, // Mock data
        toplamSertifikalar: 150, // Mock data
        gecerlilikSuresiYaklasan: 12 // Mock data
      });

      // Son aktiviteler (mock data)
      setRecentActivities([
        {
          id: 1,
          type: 'egitim',
          title: 'Yeni eğitim programı eklendi',
          description: 'Futbol antrenörlüğü temel eğitimi başlatıldı',
          time: '2 saat önce',
          icon: <GraduationCap className="w-5 h-5 text-blue-600" />
        },
        {
          id: 2,
          type: 'sertifika',
          title: 'Sertifika yenilendi',
          description: 'Ahmet Yılmaz\'ın antrenörlük sertifikası yenilendi',
          time: '4 saat önce',
          icon: <Award className="w-5 h-5 text-green-600" />
        },
        {
          id: 3,
          type: 'performans',
          title: 'Performans değerlendirmesi',
          description: 'Ay sonu performans raporları hazırlandı',
          time: '1 gün önce',
          icon: <TrendingUp className="w-5 h-5 text-yellow-600" />
        }
      ]);

    } catch (error) {
      console.error('Dashboard veri yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, subtitle, gradient }) => (
    <div className={`relative rounded-xl shadow-md p-5 flex items-center gap-4 overflow-hidden hover:scale-105 transition-transform duration-200`}>
      {/* Gradient arka plan */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${gradient} opacity-80 rounded-xl`}></div>
      {/* Kart içeriği */}
      <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white/80 shadow-lg">{icon}</div>
      <div className="relative z-10">
        <div className="text-lg font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-100 drop-shadow">{title}</div>
        {subtitle && <div className="text-xs text-gray-200 mt-1 drop-shadow">{subtitle}</div>}
      </div>
    </div>
  );

  const ActivityCard = () => (
    <div className="rounded-xl shadow-md bg-white p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto max-h-72">
        {recentActivities.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Aktivite bulunamadı.</div>
        ) : recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="btn-secondary text-blue-600 font-semibold hover:underline">Tümünü Görüntüle</button>
      </div>
    </div>
  );

  const QuickActionsCard = () => (
    <div className="rounded-xl shadow-md bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => navigate('/antrenorler')} className="flex flex-col items-center p-5 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors group">
          <Users className="w-7 h-7 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-gray-700">Antrenör Ekle</span>
        </button>
        <button onClick={() => navigate('/egitimler')} className="flex flex-col items-center p-5 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors group">
          <GraduationCap className="w-7 h-7 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-gray-700">Eğitim Oluştur</span>
        </button>
        <button onClick={() => navigate('/sertifikalar')} className="flex flex-col items-center p-5 border border-gray-200 rounded-lg hover:bg-yellow-50 transition-colors group">
          <Award className="w-7 h-7 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-gray-700">Sertifika Ekle</span>
        </button>
        <button onClick={() => navigate('/raporlar')} className="flex flex-col items-center p-5 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors group">
          <TrendingUp className="w-7 h-7 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-gray-700">Rapor Oluştur</span>
        </button>
      </div>
    </div>
  );

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-4 md:p-8 bg-gradient-to-br from-cyan-50 via-blue-100 to-blue-300 overflow-x-hidden">
      {/* Flu arka plan görseli */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm z-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80)'}}></div>
      {/* Hoş geldin kutusu ve Çıkış butonu */}
      <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 rounded-2xl shadow-xl px-8 py-6">
          <div className="bg-white/80 rounded-full p-3 shadow-lg">
            <Sparkles className="w-8 h-8 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
              Hoş geldiniz, {user?.fullName}!
            </h1>
            <p className="text-blue-100 text-lg font-medium drop-shadow">Antrenör Eğitim Takip Sistemi kontrol paneliniz</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg transition text-base"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </button>
      </div>
      {/* İstatistik kartları */}
      <div className="relative z-10">
        {isAdmin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Toplam Antrenör"
              value={stats.totalAntrenorler}
              icon={<Users className="w-7 h-7 text-white" />}
              subtitle={`${stats.aktifAntrenorler} aktif`}
              gradient="from-cyan-400 to-blue-500"
            />
            <StatCard
              title="Toplam Eğitim"
              value={stats.toplamEgitimler}
              icon={<GraduationCap className="w-7 h-7 text-white" />}
              subtitle={`${stats.devamEdenEgitimler} devam ediyor`}
              gradient="from-green-400 to-green-600"
            />
            <StatCard
              title="Toplam Sertifika"
              value={stats.toplamSertifikalar}
              icon={<Award className="w-7 h-7 text-white" />}
              subtitle={`${stats.gecerlilikSuresiYaklasan} süresi yaklaşıyor`}
              gradient="from-yellow-400 to-yellow-600"
            />
            <StatCard
              title="Performans"
              value={"%92"}
              icon={<TrendingUp className="w-7 h-7 text-white" />}
              gradient="from-indigo-400 to-indigo-600"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatCard
              title="Toplam Eğitim"
              value={stats.toplamEgitimler}
              icon={<GraduationCap className="w-7 h-7 text-white" />}
              subtitle={`${stats.devamEdenEgitimler} devam ediyor`}
              gradient="from-green-400 to-green-600"
            />
            <StatCard
              title="Toplam Sertifika"
              value={stats.toplamSertifikalar}
              icon={<Award className="w-7 h-7 text-white" />}
              subtitle={`${stats.gecerlilikSuresiYaklasan} süresi yaklaşıyor`}
              gradient="from-yellow-400 to-yellow-600"
            />
          </div>
        )}
      </div>
      {/* Ana içerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityCard />
        </div>
        <div>
          {isAdmin ? <QuickActionsCard /> : (
            <div className="rounded-xl shadow-md bg-white p-6 text-center text-gray-400 font-medium">
              Yönetimsel işlemler için yetkiniz yok.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 