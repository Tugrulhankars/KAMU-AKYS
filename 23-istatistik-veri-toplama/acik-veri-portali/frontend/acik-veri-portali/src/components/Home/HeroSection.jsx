import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, 
  Search, 
  BarChart3, 
  ArrowRight, 
  Play,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';
import akLogo from '../../assets/Ak.png';

const HeroSection = () => {
  const floatingIcons = [
    { icon: Database, delay: 0, position: 'top-20 left-10' },
    { icon: Search, delay: 0.5, position: 'top-32 right-20' },
    { icon: BarChart3, delay: 1, position: 'bottom-32 left-20' },
    { icon: TrendingUp, delay: 1.5, position: 'bottom-20 right-10' },
    { icon: Users, delay: 2, position: 'top-1/2 left-5' },
    { icon: Globe, delay: 2.5, position: 'top-1/2 right-5' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ delay: item.delay, duration: 1 }}
            className={`absolute ${item.position} text-primary-400`}
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-8 h-8 lg:w-12 lg:h-12" />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-success-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span>KAMU AKYS Projesi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">KAMU AKYS</span>
              <br />
              <span className="text-gray-900">Açık Veri Portalı</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              KAMU AKYS projesi kapsamında geliştirilen açık veri portalı. Kamu kurumları için şeffaflık ve veri erişilebilirliği 
              sağlayan modern platform ile verilerinizi keşfedin, analiz edin ve paylaşın.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/datasets"
                className="btn-primary text-lg px-8 py-4 group"
              >
                <span>Veri Setlerini Keşfet</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="btn-outline text-lg px-8 py-4 group">
                <Play className="w-5 h-5 mr-2" />
                <span>Demo İzle</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-8 mt-12 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-primary-400 to-accent-400"
                    />
                  ))}
                </div>
                <span>1000+ Aktif Kullanıcı</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>5000+ Veri Seti</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-strong p-8 border border-gray-100">
              {/* Dashboard Preview */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-xs text-gray-500">KAMU AKYS Portalı</div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-primary-600" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Veri Setleri', value: '5,234', color: 'primary' },
                    { label: 'İndirmeler', value: '12.5K', color: 'success' },
                    { label: 'Kullanıcılar', value: '1,234', color: 'accent' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      className="text-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className={`text-lg font-bold text-${stat.color}-600`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
            >
              <img src={akLogo} alt="KAMU AKYS" className="w-8 h-8 object-contain" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center"
            >
              <Search className="w-6 h-6 text-accent-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 