import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AkLogo from '../assets/Ak_dark.png';

const HeroSection = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 text-center">
      <div className="flex justify-center mb-6">
        <img 
          src={AkLogo} 
          alt="KAMU-AKYS Logo" 
          className="h-24 w-auto"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Etkili Anketler Oluşturun ve Yönetin
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto mb-8">
        Kamu kurumları için özel olarak tasarlanmış açık kaynak kodlu anket yönetim sistemi ile verilerinizi kolayca toplayın, analiz edin ve raporlayın.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {user ? (
          <>
            <Link
              to="/surveys/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Yeni Anket Oluştur
            </Link>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Anketleri Görüntüle
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Hemen Başla
            </Link>
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Giriş Yap
            </Link>
            <Link
              to="/about"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Daha Fazla Bilgi
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection; 