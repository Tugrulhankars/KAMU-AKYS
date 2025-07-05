import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  CubeIcon, 
  Bars3Icon, 
  XMarkIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Login olmuş kullanıcıları Dashboard'a yönlendir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const features = [
    {
      icon: ClipboardDocumentListIcon,
      title: "Demirbaş Yönetimi",
      description: "Tüm demirbaşlarınızı kategorize ederek dijital ortamda kaydedin ve yönetin",
      color: "blue"
    },
    {
      icon: UserGroupIcon,
      title: "Zimmet Takibi",
      description: "Personellere verilen demirbaşları takip edin ve geçmiş kayıtlarını görüntüleyin",
      color: "green"
    },
    {
      icon: ChartBarIcon,
      title: "Detaylı Raporlama",
      description: "Analitik raporlar ve görselleştirmeler ile demirbaş durumunu analiz edin",
      color: "purple"
    },
    {
      icon: CogIcon,
      title: "Kategori Yönetimi",
      description: "Demirbaşları kategorilere ayırarak düzenli bir yapı oluşturun",
      color: "orange"
    },
    {
      icon: ShieldCheckIcon,
      title: "Güvenli Erişim",
      description: "Rol bazlı yetkilendirme ile güvenli veri yönetimi sağlayın",
      color: "red"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Mobil Uyumlu",
      description: "Tüm cihazlarda sorunsuz çalışan responsive tasarım",
      color: "indigo"
    }
  ];

  const benefits = [
    "Demirbaş kayıt ve takip otomasyonu",
    "Zimmet işlemleri dijitalleştirme",
    "Detaylı raporlama ve analiz",
    "Kullanıcı dostu arayüz",
    "Güvenli veri yönetimi",
    "Hızlı arama ve filtreleme"
  ];

  const stats = [
    { number: "1000+", label: "Demirbaş Kaydı" },
    { number: "50+", label: "Aktif Kullanıcı" },
    { number: "99.9%", label: "Güvenilirlik" },
    { number: "24/7", label: "Destek" }
  ];

  const statIcons = [
    CubeIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    BoltIcon
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Navigation */}
      <nav className="bg-background shadow-lg sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CubeIcon className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-primary">Kamu-AKYS Demirbaş Takip</span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Özellikler</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">Hakkında</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">İletişim</a>
              <Link to="/login">
                <button className="btn-secondary">Giriş Yap</button>
              </Link>
              <Link to="/register">
                <button className="btn-primary">Kayıt Ol</button>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-primary focus:outline-none">
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-background border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-muted-foreground hover:text-primary">Özellikler</a>
                <a href="#about" className="block px-3 py-2 text-muted-foreground hover:text-primary">Hakkında</a>
                <a href="#contact" className="block px-3 py-2 text-muted-foreground hover:text-primary">İletişim</a>
                <Link to="/login" className="block px-3 py-2">
                  <button className="btn-secondary w-full">Giriş Yap</button>
                </Link>
                <Link to="/register" className="block px-3 py-2">
                  <button className="btn-primary w-full">Kayıt Ol</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Kamu-AKYS Demirbaş Takip Sistemi
              <span className="block text-primary-200 font-light text-2xl md:text-4xl mt-2">Kamu kurumları için modern, güvenli ve hızlı demirbaş yönetimi</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Tüm varlıklarınızı dijital ortamda kolayca yönetin, zimmet ve raporlama işlemlerini tek platformda gerçekleştirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="btn-primary text-lg px-8 py-4">Hemen Kayıt Ol</button>
              </Link>
              <Link to="/login">
                <button className="btn-secondary text-lg px-8 py-4">Giriş Yap</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = statIcons[index];
              return (
                <div key={index} className="flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 mb-3">
                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-base font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern teknolojilerle geliştirilmiş kapsamlı demirbaş yönetim çözümü
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Neden Demirbaş Takip Sistemi?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Geleneksel kağıt tabanlı demirbaş yönetiminden dijital dönüşüme adım atın.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <BoltIcon className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">Hızlı Performans</h3>
                </div>
                <p className="text-primary-100 mb-6">
                  Optimized kod yapısı ve modern teknolojiler sayesinde yüksek performans.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">%99.9</div>
                    <div className="text-sm text-primary-200">Uptime</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">&lt;1s</div>
                    <div className="text-sm text-primary-200">Yanıt Süresi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hakkımızda
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kamu kurumları için özel olarak geliştirilmiş bu sistem, demirbaş yönetimi 
              süreçlerini dijitalleştirerek verimliliği artırır ve şeffaflığı sağlar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Teknoloji</h3>
              <p className="text-gray-600">React, ASP.NET Core ve SQL Server</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Güvenlik</h3>
              <p className="text-gray-600">JWT tabanlı kimlik doğrulama</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DevicePhoneMobileIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive</h3>
              <p className="text-gray-600">Tüm cihazlarda mükemmel görünüm</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hızlı</h3>
              <p className="text-gray-600">Optimize edilmiş performans</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Demirbaş yönetimi süreçlerinizi dijitalleştirin ve verimliliğinizi artırın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
            >
              Ücretsiz Kayıt Ol
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              İletişim
            </h2>
            <p className="text-xl text-gray-600">
              Sistem hakkında sorularınız için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <EnvelopeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">E-posta</h3>
              <p className="text-gray-600">info@demirbas.gov.tr</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <PhoneIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-gray-600">0312 XXX XX XX</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPinIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adres</h3>
              <p className="text-gray-600">Ankara, Türkiye</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <CubeIcon className="h-8 w-8 text-primary-400 mr-2" />
                <span className="text-xl font-bold">Demirbaş Takip Sistemi</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Kamu kurumları için geliştirilmiş modern demirbaş yönetim çözümü. 
                Güvenli, hızlı ve kullanıcı dostu arayüz ile demirbaşlarınızı yönetin.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Hakkında</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">İletişim</a></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Giriş Yap</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Destek</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dokümantasyon</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">SSS</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Teknik Destek</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Demirbaş Takip Sistemi. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 