import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Calendar, Users, CreditCard, Smartphone, Mail, BarChart2, Zap, CheckCircle, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Online Kayıt ve Ödeme',
    desc: 'Kamp başvurularını ve ödemeleri dijital ortamda kolayca yönetin.'
  },
  {
    icon: <Users className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Veli İletişimi',
    desc: 'Velilere toplu bildirimler, e-posta ve SMS ile anında ulaşın.'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Yoklama & QR Kod',
    desc: 'Katılımcı giriş-çıkışlarını QR kod ile hızlıca takip edin.'
  },
  {
    icon: <CreditCard className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Faturalandırma',
    desc: 'Otomatik faturalandırma ve ödeme takibi ile iş yükünüzü azaltın.'
  },
  {
    icon: <Smartphone className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Mobil Uyumlu Panel',
    desc: 'Tüm işlemleri mobil cihazlardan da kolayca yönetin.'
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Detaylı Analitik',
    desc: 'Kamp performansınızı ve kayıt istatistiklerini anlık izleyin.'
  },
  {
    icon: <Zap className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Otomatik Bildirimler',
    desc: 'Kamp hatırlatmaları ve önemli duyurular otomatik iletilir.'
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Müşteri Destek',
    desc: 'Her an ulaşabileceğiniz destek ekibi ile sorunsuz kullanım.'
  },
];

const testimonials = [
  {
    name: 'Ayşe K.',
    text: '“Gençlik Kampı Yönetim Sistemi ile kayıt ve yoklama süreçlerimiz çok kolaylaştı. Veli iletişimi ve raporlar harika!”',
    role: 'Kamp Yöneticisi'
  },
  {
    name: 'Mehmet D.',
    text: '“Online ödeme ve otomatik bildirimler sayesinde tüm süreçlerimiz dijitalleşti. Mobil panel çok pratik!”',
    role: 'Kamp Koordinatörü'
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-blue-100 to-white">
      {/* Header */}
      <nav className="w-full bg-white/80 shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-20 backdrop-blur">
        <Link to="/" className="text-2xl font-extrabold text-cyan-700 tracking-tight">Gençlik Kampı</Link>
        <div className="flex gap-6 items-center">
          <a href="#features" className="text-gray-700 hover:text-cyan-700 font-medium transition">Özellikler</a>
          <a href="#demo" className="text-gray-700 hover:text-cyan-700 font-medium transition">Demo Talep Et</a>
          <a href="#testimonials" className="text-gray-700 hover:text-cyan-700 font-medium transition">Yorumlar</a>
          <Link to="/login"><Button variant="outline">Giriş Yap</Button></Link>
          <Link to="/register"><Button className="ml-2">Kayıt Ol</Button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-20 max-w-7xl mx-auto w-full">
        {/* Sol blok */}
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-800 mb-6 leading-tight drop-shadow-lg">
            Gençlik Kampı Yönetim Sistemi
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Kamp kayıt, yoklama, iletişim ve faturalandırma süreçlerinizi tek panelden yönetin. Dijitalleşmiş kamp yönetimi ile zamandan ve iş gücünden tasarruf edin.
          </p>
          <div className="flex gap-4">
            <Link to="/register"><Button size="lg">14 Gün Ücretsiz Dene</Button></Link>
            <a href="#demo"><Button variant="outline" size="lg">Demo Talep Et</Button></a>
          </div>
        </div>
        {/* Sağ blok - görsel */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute -inset-4 bg-cyan-200 rounded-full blur-3xl opacity-40"></div>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80" alt="Kamp" className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white relative z-10" />
        </div>
      </section>

      {/* Özellikler */}
      <section id="features" className="py-20 px-4 bg-white/80">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-800 text-center mb-4">Tüm Kamp Süreçleri Tek Panelde</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Gençlik Kampı Yönetim Sistemi, kamp başvurularından yoklamaya, ödeme ve iletişimden raporlamaya kadar tüm süreçleri dijitalleştirir.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              {f.icon}
              <h3 className="font-bold text-lg text-cyan-700 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Çağrısı */}
      <section id="demo" className="py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-100 via-blue-100 to-white">
        <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-800 mb-4">Kampınızı Dijitalleştirin!</h2>
        <p className="text-gray-600 mb-6 text-center max-w-xl">
          Hemen ücretsiz deneme başlatın veya demo talep ederek sistemimizi yakından inceleyin.
        </p>
        <div className="flex gap-4">
          <Link to="/register"><Button size="lg">14 Gün Ücretsiz Dene</Button></Link>
          <a href="mailto:info@kampyonetim.com"><Button variant="outline" size="lg" icon={<Mail className="w-5 h-5" />} iconPosition="left">Demo Talep Et</Button></a>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section id="testimonials" className="py-20 px-4 bg-white/90">
        <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-800 text-center mb-10">Kullanıcı Yorumları</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-cyan-50 rounded-2xl shadow p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-200 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <p className="text-gray-700 italic mb-4">{t.text}</p>
              <div className="font-bold text-cyan-700">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-8 text-center text-gray-500 text-sm mt-auto">
        © {new Date().getFullYear()} Gençlik Kampı Yönetim Sistemi. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Home; 