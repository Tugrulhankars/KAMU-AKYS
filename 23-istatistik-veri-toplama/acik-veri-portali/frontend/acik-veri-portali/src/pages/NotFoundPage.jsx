import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-9xl font-bold text-primary-200 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="btn-primary inline-flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Ana Sayfaya Dön
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 