import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Users, Shield, Database, CheckCircle, ArrowRight } from 'lucide-react'

const Home: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Rol Tabanlı Erişim',
      description: 'Admin, Görevli ve Gözlemci rolleriyle güvenli yetkilendirme sistemi.'
    },
    {
      icon: Database,
      title: 'Güvenli Veri Saklama',
      description: 'Modern veritabanı teknolojileri ile güvenli ve ölçeklenebilir veri yönetimi.'
    },
    {
      icon: BarChart3,
      title: 'Gerçek Zamanlı İstatistikler',
      description: 'Anlık raporlar ve demografik analizler ile detaylı veri görselleştirme.'
    },
    {
      icon: Shield,
      title: 'Yüksek Güvenlik',
      description: 'JWT tabanlı kimlik doğrulama ve şifreleme ile maksimum güvenlik.'
    },
  ]

  const stats = [
    { label: 'Güvenli Veri Saklama', value: '100%' },
    { label: 'Kullanıcı Memnuniyeti', value: '99%' },
    { label: 'Sistem Uptime', value: '99.9%' },
    { label: 'Veri Doğruluğu', value: '100%' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Nüfus Sayım Platformu
              </span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Dijital Nüfus Sayım
              <span className="block text-primary-200">Platformu</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Kamu kurumları için modern, güvenli ve kullanıcı dostu nüfus veri toplama ve yönetim sistemi. 
              Gerçek zamanlı istatistikler ve rol tabanlı erişim kontrolü ile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Hemen Başlayın
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors"
              >
                Giriş Yapın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neden Bizim Platformu Seçmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern teknolojiler ve güvenlik standartları ile geliştirilen 
              kapsamlı nüfus veri yönetim çözümü.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Dijital Dönüşümde Öncü Olun
              </h2>
              <div className="space-y-4">
                {[
                  'Kağıt tabanlı süreçleri dijitalleştirin',
                  'Gerçek zamanlı veri analizi yapın',
                  'Güvenli ve ölçeklenebilir altyapı',
                  'Kullanıcı dostu arayüz tasarımı',
                  'Kapsamlı raporlama sistemi',
                  '7/24 teknik destek'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Demo Hesap ile Deneyin
              </h3>
              <p className="text-gray-600 mb-6">
                Platformun tüm özelliklerini demo hesap ile ücretsiz deneyebilirsiniz.
              </p>
              <div className="bg-white p-4 rounded-md border">
                <div className="text-sm text-gray-600 mb-2">Demo Bilgileri:</div>
                <div className="font-mono text-sm">
                  <div>Kullanıcı Adı: <span className="font-semibold">admin</span></div>
                  <div>Şifre: <span className="font-semibold">admin123</span></div>
                  <div>Rol: <span className="font-semibold">Admin</span></div>
                </div>
              </div>
              <Link
                to="/login"
                className="btn-primary w-full mt-4 justify-center"
              >
                Demo ile Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold text-white">
                Nüfus Sayım Platformu
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Açık kaynak nüfus veri toplama ve yönetim sistemi
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Nüfus Sayım Platformu. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 