import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Trophy, 
  Building, 
  ArrowRight, 
  CheckCircle,
  Star,
  Award,
  Shield,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AkLogo from '../assets/Ak.png';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides
  const slides = [
    {
      id: 1,
      title: "Sporcu Lisans Yönetimi",
      description: "Türkiye'nin en kapsamlı sporcu lisans takip sistemi ile sporcularınızı profesyonelce yönetin.",
      image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&w=1200&q=80"
    },
    {
      id: 2,
      title: "Federasyon Entegrasyonu",
      description: "Tüm spor federasyonları ile entegre çalışan sistem ile lisans işlemlerinizi kolaylaştırın.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Akıllı Raporlama",
      description: "Gelişmiş analitik ve raporlama araçları ile sporcu performansını takip edin.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Kayıtlı Sporcu" },
    { icon: FileText, value: "25,000+", label: "Aktif Lisans" },
    { icon: Trophy, value: "50+", label: "Spor Dalı" },
    { icon: Building, value: "200+", label: "Kulüp" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Güvenli Veri Yönetimi",
      description: "En son güvenlik standartları ile verileriniz korunur"
    },
    {
      icon: Clock,
      title: "7/24 Erişim",
      description: "İstediğiniz zaman, istediğiniz yerden sisteme erişin"
    },
    {
      icon: TrendingUp,
      title: "Performans Analizi",
      description: "Sporcu performansını detaylı analiz edin"
    },
    {
      icon: Award,
      title: "Federasyon Uyumlu",
      description: "Tüm federasyon standartlarına uyumlu"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Logo üstte */}
        <div className="absolute top-8 left-8 z-30 flex items-center gap-2">
          <img src={AkLogo} alt="KAMU-AKYS Logo" className="h-14 w-auto drop-shadow-lg" />
          <span className="text-lg font-bold text-white drop-shadow">KAMU-AKYS</span>
        </div>
        {/* Carousel */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl mx-auto px-4">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {slide.description}
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
                  >
                    Hemen Başla
                    <ArrowRight className="inline ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Güvenilir İstatistikler
            </h2>
            <p className="text-xl text-gray-600">
              Sistemimizde kayıtlı sporcu ve lisans verileri
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Biz?
            </h2>
            <p className="text-xl text-gray-600">
              Sporcu lisans yönetiminde fark yaratan özelliklerimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sporcu lisans yönetimini kolaylaştırmak için bugün sisteme kayıt olun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => navigate('/register')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-8">
            <div className="flex items-center gap-3">
              <img src={AkLogo} alt="KAMU-AKYS Logo" className="h-12 w-auto" />
              <span className="text-xl font-bold text-white">KAMU-AKYS</span>
            </div>
            <div className="text-gray-400 text-sm md:text-base text-center md:text-left">
              Bu proje <b>KAMU-AKYS</b> kapsamında <b>açık kaynak</b> olarak geliştirilmiştir ve <b>kamuya ücretsiz hizmet vermektedir</b>.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sporcu Lisans Takip</h3>
              <p className="text-gray-400">
                Türkiye'nin en kapsamlı sporcu lisans yönetim sistemi
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hizmetler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Yardım</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Spor Dalları</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Futbol</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Basketbol</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Yüzme</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atletizm</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@spor.gov.tr</li>
                <li>+90 212 123 45 67</li>
                <li>Ankara, Türkiye</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sporcu Lisans Takip Sistemi. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 