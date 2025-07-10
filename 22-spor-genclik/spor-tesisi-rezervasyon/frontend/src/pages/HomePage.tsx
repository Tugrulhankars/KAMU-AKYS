import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import AkLogo from '../assets/Ak.png';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const features = [
    {
      icon: Building2,
      title: "Çeşitli Tesisler",
      description: "Futbol, basketbol, tenis, yüzme ve daha fazlası."
    },
    {
      icon: Calendar,
      title: "Kolay Rezervasyon",
      description: "7/24 online rezervasyon sistemi."
    },
    {
      icon: Users,
      title: "Topluluk",
      description: "Binlerce aktif sporcu."
    },
    {
      icon: Star,
      title: "Kaliteli Hizmet",
      description: "Profesyonel ekipman ve bakım."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Logo üstte küçük ve sade */}
      <div className="flex justify-center pt-10">
        <img src={AkLogo} alt="KAMU-AKYS Logo" className="h-14 w-auto opacity-90" />
      </div>
      {/* Hero Section */}
      <section className={`relative flex flex-col items-center justify-center py-24 px-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ minHeight: '70vh' }}>
        {/* Arka plan fotoğrafı */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
            alt="Spor Tesisi"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.7) blur(0px)' }}
          />
          <div className="absolute inset-0 bg-white/70"></div>
        </div>
        {/* Hero Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center tracking-tight animate-title-hero-animated">
            Spor Tesisi Rezervasyon Sistemi
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 text-center max-w-2xl animate-fade-in-slow">
            KAMU-AKYS kapsamında geliştirilen, modern ve güvenli spor tesisi yönetim platformu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Link
              to="/register"
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              Hemen Başla
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/facilities"
              className="bg-white border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center"
            >
              Tesisleri Keşfet
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-24">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2563EB] text-white rounded-full mb-4 shadow animate-scale-in">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-base">{feature.description}</p>
            </div>
          );
        })}
      </section>
      {/* Animasyonlar için stil */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease both;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.5s ease both;
        }
        .animate-scale-in {
          animation: scaleIn 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-title-hero-animated {
          animation: titleHeroAnimated 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes titleHeroAnimated {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.92);
            letter-spacing: 0.1em;
            color: #CBD5E1;
          }
          60% {
            opacity: 1;
            transform: translateY(8px) scale(1.04);
            letter-spacing: 0.02em;
            color: #2563EB;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            letter-spacing: 0em;
            color: #1E293B;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 