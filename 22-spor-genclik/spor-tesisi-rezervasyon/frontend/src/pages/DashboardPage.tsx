import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { facilityAPI, reservationAPI } from '../services/api';
import { Building2, Calendar, Users, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const stats = [
  {
    label: "Toplam Mesafe",
    value: "4.5 M KM",
    description: "Kayıtlı toplam mesafe",
  },
  {
    label: "Sporcu Performansı",
    value: "23.5 K",
    description: "İzlenen sporcu sayısı",
  },
  {
    label: "Antrenman Analizi",
    value: "1.35 M",
    description: "Analiz edilen antrenman",
  },
];

const DashboardPage: React.FC = () => {
  const [facilities, setFacilities] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [facilitiesData, reservationsData] = await Promise.all([
        facilityAPI.getAll(),
        reservationAPI.getMyReservations()
      ]);
      
      setFacilities(facilitiesData);
      setReservations(reservationsData);
    } catch (error: any) {
      toast.error('Dashboard verileri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      {/* Stats */}
      <div className="max-w-5xl mx-auto mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
          >
            <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
            <div className="text-lg font-semibold mt-2">{stat.label}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Antrenman ve Maç Takibi</h2>
          <p className="text-gray-600">Tüm antrenman ve maçlarınızı tek bir panelden yönetin, analiz edin ve raporlayın.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Sporcu Sağlık ve Performans</h2>
          <p className="text-gray-600">Sporcularınızın sağlık ve performans verilerini merkezi olarak takip edin, gelişimlerini izleyin.</p>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage; 