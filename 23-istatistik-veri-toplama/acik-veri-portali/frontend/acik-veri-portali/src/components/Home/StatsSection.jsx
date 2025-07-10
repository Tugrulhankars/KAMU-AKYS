import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Download, 
  Users, 
  TrendingUp,
  Eye,
  FileText
} from 'lucide-react';

const StatsSection = ({ stats, loading }) => {
  const defaultStats = [
    {
      icon: Database,
      label: 'Toplam Veri Seti',
      value: '5,234',
      change: '+12%',
      changeType: 'positive',
      color: 'primary'
    },
    {
      icon: Download,
      label: 'Toplam İndirme',
      value: '125,432',
      change: '+8%',
      changeType: 'positive',
      color: 'success'
    },
    {
      icon: Users,
      label: 'Aktif Kullanıcı',
      value: '1,234',
      change: '+15%',
      changeType: 'positive',
      color: 'accent'
    },
    {
      icon: Eye,
      label: 'Toplam Görüntüleme',
      value: '2.5M',
      change: '+23%',
      changeType: 'positive',
      color: 'warning'
    }
  ];

  const displayStats = stats?.data || defaultStats;

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Platform İstatistikleri
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Açık veri portalımızın büyüyen topluluğu ve etkisi hakkında güncel istatistikler
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${stat.color}-200 transition-colors`}
                >
                  <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-gray-600 mb-2">{stat.label}</div>
                
                <div className={`inline-flex items-center text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 text-center">
            <FileText className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary-900 mb-1">50+</div>
            <div className="text-primary-700">Kategori</div>
          </div>
          
          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 text-center">
            <Database className="w-8 h-8 text-accent-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-accent-900 mb-1">25+</div>
            <div className="text-accent-700">Kurum</div>
          </div>
          
          <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-success-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-success-900 mb-1">99.9%</div>
            <div className="text-success-700">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 