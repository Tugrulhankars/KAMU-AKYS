import React from 'react';
import { ArrowRight, Database, Users, ShieldCheck } from 'lucide-react';
import istatiki from '../assets/istatiki.png';

const infoCards = [
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: 'Açık Veri',
    desc: 'Binlerce kamuya açık veri setine kolayca erişin, analiz edin ve paylaşın.'
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: 'Topluluk',
    desc: 'Büyüyen veri topluluğumuzda bilgi paylaşın, destek alın ve projeler üretin.'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-yellow-500" />,
    title: 'Güvenlik',
    desc: 'Verileriniz ve analizleriniz güvenli altyapı ile korunur.'
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Üst Menü */}
      <header className="w-full flex items-center justify-between px-10 py-5 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-extrabold text-2xl tracking-tight">kamuveri</span>
        </div>
        <nav className="flex-1 flex items-center justify-center gap-8 text-gray-700 font-medium text-base">
          <a href="/datasets" className="hover:text-blue-600 transition-colors">Datasets</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Competitions</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Community</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Blog</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Courses</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/login" className="px-5 py-2 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-colors">Sign In</a>
          <a href="/register" className="px-5 py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow">Register</a>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-0 md:gap-0 px-4 py-20 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pr-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            Açık Veriyle Geleceği Keşfet
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">
            Modern arayüz, güçlü analiz araçları ve binlerce veri setiyle kamu verisinin gücünü keşfedin. Hemen ücretsiz katılın, analiz yapmaya başlayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <a
              href="/register"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Register <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/login"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 text-blue-700 px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-100 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mb-10 md:mb-0">
          <img
            src={istatiki}
            alt="Topluluk"
            className="w-full max-w-xl md:max-w-lg lg:max-w-2xl h-auto"
            style={{ minWidth: 320 }}
          />
        </div>
      </section>

      {/* Bilgi Kartları */}
      <section className="max-w-6xl mx-auto w-full py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {infoCards.map((card, i) => (
            <div key={i} className="bg-white border rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              {card.icon}
              <h3 className="mt-4 text-xl font-bold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-gray-600 text-base">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topluluk/İstatistik Bölümü */}
      <section className="max-w-5xl mx-auto py-16 px-4 w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Türkiye'nin En Büyük Açık Veri Topluluğu</h2>
          <p className="text-lg text-gray-600 mb-6">10.000+ veri meraklısı, araştırmacı ve geliştiriciyle birlikte büyüyen bir topluluğa katılın. Bilgi paylaşın, projeler üretin, destek alın.</p>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-500 text-sm">Kullanıcı</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">2K+</div>
              <div className="text-gray-500 text-sm">Veri Seti</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-gray-500 text-sm">Aktif Proje</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://kaggle.com/static/images/illustrations/community/who-is-on-kaggle.svg" alt="Topluluk" className="max-h-72 w-auto" />
        </div>
      </section>

      {/* Referanslar */}
      <section className="max-w-4xl mx-auto py-8 px-4 w-full">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-4 border">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Kullanıcı" className="h-16 w-16 rounded-full border-2 border-blue-600" />
          <div>
            <p className="text-gray-700 italic">“Platform sayesinde veri analiz süreçlerimiz çok daha hızlı ve verimli hale geldi. Modern arayüz ve güçlü görselleştirme araçları harika!”</p>
            <span className="block mt-2 font-semibold text-gray-900">Mehmet Yılmaz, Veri Analisti</span>
          </div>
        </div>
        <div className="text-center mt-8">
          <span className="text-gray-500">Sorunuz mu var? <a href="mailto:support@kamuveri.com" className="text-blue-600 hover:underline">Destek ekibimize ulaşın</a></span>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full bg-gray-50 border-t pt-10 pb-6 px-4 text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 pb-8 border-b">
          <div>
            <div className="text-blue-600 font-extrabold text-xl mb-2">kamuveri</div>
            <p className="mb-2">Açık veriyle geleceği keşfet. Binlerce veri seti, güçlü analiz araçları ve aktif topluluk.</p>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Kamu Veri Platformu</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Keşfet</div>
            <ul className="space-y-1">
              <li><a href="/datasets" className="hover:underline">Veri Setleri</a></li>
              <li><a href="#" className="hover:underline">Yarışmalar</a></li>
              <li><a href="#" className="hover:underline">Topluluk</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Kaynaklar</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">API Dokümantasyonu</a></li>
              <li><a href="#" className="hover:underline">Yardım Merkezi</a></li>
              <li><a href="#" className="hover:underline">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:underline">Kullanım Şartları</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">İletişim</div>
            <ul className="space-y-1">
              <li><a href="mailto:support@kamuveri.com" className="hover:underline">support@kamuveri.com</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 pt-6">Tüm hakları saklıdır.</div>
      </footer>
    </div>
  );
};

export default Home; 