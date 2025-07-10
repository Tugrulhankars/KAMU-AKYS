import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  Gamepad2, 
  Building2, 
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Müsabaka Yönetimi',
      description: 'Spor müsabakalarını kolayca oluşturun, planlayın ve yönetin.'
    },
    {
      icon: Users,
      title: 'Katılımcı Takibi',
      description: 'Katılımcıları kaydedin, ödemelerini takip edin ve durumlarını yönetin.'
    },
    {
      icon: Gamepad2,
      title: 'Maç Organizasyonu',
      description: 'Maçları programlayın, skorları güncelleyin ve sonuçları takip edin.'
    },
    {
      icon: Building2,
      title: 'Tesis Yönetimi',
      description: 'Spor tesislerini yönetin, rezervasyonları organize edin.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Müsabaka' },
    { number: '10K+', label: 'Katılımcı' },
    { number: '1000+', label: 'Maç' },
    { number: '50+', label: 'Tesis' }
  ];

  const benefits = [
    'Kolay kullanım arayüzü',
    'Gerçek zamanlı veri güncelleme',
    'Mobil uyumlu tasarım',
    'Güvenli veri yönetimi',
    'Detaylı raporlama',
    '7/24 teknik destek'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Trophy className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Spor Müsabaka Organizasyonu
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              KAMU-AKYS projesi kapsamında geliştirilen modern spor organizasyon yönetim sistemi
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Sisteme Giriş
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KAMU-AKYS Badge */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full">
              <Award className="h-5 w-5 mr-2" />
              <span className="font-semibold">KAMU-AKYS Projesi Kapsamında Geliştirilmiştir</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sistem Özellikleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spor organizasyonlarınızı profesyonel bir şekilde yönetmek için ihtiyacınız olan tüm araçlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Başarı İstatistikleri
            </h2>
            <p className="text-xl text-blue-100">
              Sistemimizde yönetilen veriler
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mutlu Kullanıcılar, Kanıtlanmış Sonuçlar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kullanıcılarımızın deneyimleri ve geri bildirimleri, sistemimizin başarısını ortaya koyuyor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">
              <p className="text-gray-700 mb-4">“Spor organizasyonlarımızı yönetmek hiç bu kadar kolay olmamıştı. Kullanıcı dostu arayüz ve hızlı destek harika!”</p>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 font-bold text-blue-700">LW</div>
                <span className="font-semibold text-gray-900">Lara William</span>
                <span className="text-gray-500 text-sm">Organizatör</span>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">
              <p className="text-gray-700 mb-4">“Tüm müsabaka ve katılımcı işlemlerimizi tek panelden yönetebiliyoruz. Zaman ve iş gücü tasarrufu sağladı.”</p>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 font-bold text-blue-700">JJ</div>
                <span className="font-semibold text-gray-900">Jacob John</span>
                <span className="text-gray-500 text-sm">Spor Kulübü Yöneticisi</span>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">
              <p className="text-gray-700 mb-4">“Mobil uyumlu ve güvenli bir sistem. Herkese tavsiye ederim!”</p>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 font-bold text-blue-700">AK</div>
                <span className="font-semibold text-gray-900">Ayşe Kaya</span>
                <span className="text-gray-500 text-sm">Katılımcı</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Neden Bizi Seçmelisiniz?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                KAMU-AKYS standartlarında geliştirilen sistemimiz, spor organizasyonlarınızı 
                profesyonel bir şekilde yönetmenizi sağlar.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-6">
                  <Star className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  KAMU-AKYS Kalitesi
                </h3>
                <p className="text-gray-600 mb-6">
                  Bu sistem, kamu kurumlarının ihtiyaçları göz önünde bulundurularak 
                  özel olarak tasarlanmıştır.
                </p>
                <div className="flex items-center justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Spor organizasyonlarınızı profesyonel bir şekilde yönetmek için 
            sistemimize göz atın.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
          >
            Sisteme Giriş Yapın
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo ve Açıklama */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold">Spor Müsabaka Organizasyonu</span>
              </div>
              <p className="text-gray-400 mb-4">
                KAMU-AKYS projesi kapsamında geliştirilen modern spor organizasyon 
                yönetim sistemi. Spor müsabakalarınızı profesyonel bir şekilde 
                yönetmenizi sağlar.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/competitions" className="text-gray-400 hover:text-white transition-colors">
                    Müsabakalar
                  </Link>
                </li>
                <li>
                  <Link to="/participants" className="text-gray-400 hover:text-white transition-colors">
                    Katılımcılar
                  </Link>
                </li>
                <li>
                  <Link to="/matches" className="text-gray-400 hover:text-white transition-colors">
                    Maçlar
                  </Link>
                </li>
                <li>
                  <Link to="/venues" className="text-gray-400 hover:text-white transition-colors">
                    Tesisler
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="text-lg font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Ankara, Türkiye</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+90 312 XXX XX XX</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@kamu-akys.gov.tr</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 KAMU-AKYS Spor Müsabaka Organizasyonu. Tüm hakları saklıdır.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Bu sistem KAMU-AKYS projesi kapsamında geliştirilmiştir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 