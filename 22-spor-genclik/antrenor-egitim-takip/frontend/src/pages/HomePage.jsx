import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Üst Menü */}
      <header className="flex items-center justify-between px-8 py-6 bg-transparent absolute w-full z-10">
        <div className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
          Antrenör Eğitim Takip
        </div>
        <nav className="flex items-center gap-8">
          <button className="text-white font-medium hover:underline transition" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Özellikler</button>
          <button className="text-white font-medium hover:underline transition">Fiyatlandırma</button>
          <button className="text-white font-medium hover:underline transition">Blog</button>
          <button className="text-white font-medium hover:underline transition" onClick={() => navigate('/login')}>Giriş Yap</button>
          <button className="ml-2 px-5 py-2 border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition" onClick={() => navigate('/register')}>Kayıt Ol</button>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-stretch">
        {/* Sol Blok */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-32 bg-gradient-to-br from-cyan-500 to-blue-500 relative z-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Antrenörlerinizi ve eğitim süreçlerinizi <br /> kolayca yönetin!
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-lg">
            Antrenör Eğitim Takip Sistemi ile tüm antrenörlerinizi, eğitim programlarını ve sertifikaları tek panelden kolayca takip edin. Dijitalleşmiş süreçlerle zamandan ve iş gücünden tasarruf edin.
          </p>
          <button className="bg-white text-cyan-600 font-bold px-8 py-4 rounded-lg shadow-lg text-lg hover:bg-cyan-50 transition w-fit" onClick={() => navigate('/register')}>
            30 Gün Ücretsiz Dene
          </button>
        </div>
        {/* Sağ Blok */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80)'}}></div>
          <div className="relative z-10 flex flex-col items-center">
            <img src="https://www.svgrepo.com/show/303251/ipad.svg" alt="Tablet" className="w-56 md:w-72 mb-4 drop-shadow-xl" />
            <img src="https://www.svgrepo.com/show/303300/iphone.svg" alt="Telefon" className="w-24 md:w-32 -mt-12 drop-shadow-xl" />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white py-16 px-4 md:px-0 text-center" id="features">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Özellikler</h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          Antrenör Eğitim Takip Sistemi, antrenörlerinizi, eğitimlerinizi ve sertifikalarınızı merkezi bir panelden yönetmenizi sağlar. Modern, güvenli ve kullanıcı dostu arayüz ile işlerinizi kolaylaştırır.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col items-center">
            <span className="text-cyan-500 text-4xl mb-4">📊</span>
            <h3 className="font-bold text-lg mb-2">Detaylı Raporlama</h3>
            <p className="text-gray-500">Eğitim, antrenör ve sertifika süreçlerinizi anlık olarak raporlayın.</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col items-center">
            <span className="text-cyan-500 text-4xl mb-4">🔒</span>
            <h3 className="font-bold text-lg mb-2">Güvenli Erişim</h3>
            <p className="text-gray-500">Rol tabanlı yetkilendirme ile verilerinizi güvenle yönetin.</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col items-center">
            <span className="text-cyan-500 text-4xl mb-4">⚡</span>
            <h3 className="font-bold text-lg mb-2">Hızlı ve Kolay Kullanım</h3>
            <p className="text-gray-500">Modern arayüz ile tüm işlemlerinizi hızlıca tamamlayın.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 