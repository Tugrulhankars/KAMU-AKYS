import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Settings, 
  User,
  TrendingUp,
  Database,
  Download,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import akLogo from '../../assets/Ak.png';

const DashboardHeader = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Toplam Veri Seti',
      value: '5,234',
      change: '+12%',
      icon: Database,
      color: 'primary'
    },
    {
      label: 'Toplam İndirme',
      value: '12.5K',
      change: '+8%',
      icon: Download,
      color: 'success'
    },
    {
      label: 'Toplam Görüntüleme',
      value: '45.2K',
      change: '+15%',
      icon: Eye,
      color: 'accent'
    },
    {
      label: 'Aktif Kullanıcı',
      value: '1,234',
      change: '+5%',
      icon: User,
      color: 'warning'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-medium border border-gray-100 p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12">
            <img src={akLogo} alt="KAMU AKYS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KAMU AKYS Dashboard</h1>
            <p className="text-gray-600">Açık Veri Portalı Yönetim Paneli</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Ara..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                <span className="text-xs text-gray-500">bu ay</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DashboardHeader; 