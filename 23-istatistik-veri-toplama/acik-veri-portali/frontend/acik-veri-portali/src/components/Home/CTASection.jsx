import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Users } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Açık Veri Topluluğuna Katılın
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Şeffaflık ve veri erişilebilirliği için çalışan topluluğumuzun bir parçası olun. 
            Verilerinizi paylaşın, analiz edin ve keşfedin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 inline-flex items-center"
            >
              <Database className="w-5 h-5 mr-2" />
              <span>Hemen Başlayın</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              to="/datasets"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 inline-flex items-center"
            >
              <Users className="w-5 h-5 mr-2" />
              <span>Veri Setlerini Keşfedin</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-primary-200">Veri Seti</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-primary-200">Aktif Kullanıcı</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Kategori</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 