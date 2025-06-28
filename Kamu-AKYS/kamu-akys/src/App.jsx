/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Hakkimizda from './pages/Hakkimizda';
import Destekleyenler from './pages/Destekleyenler';
import Teknolojiler from './pages/Teknolojiler';
import KatkidaBulunanlar from './pages/KatkidaBulunanlar';
import GithubPage from './pages/GithubPage';
import Katki from './pages/Katki';
import NotFound from './pages/NotFound';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import AkLogo from './assets/Ak.png';
import AkLogoDark from './assets/Ak_dark.png';
import Carousel from './components/Carousel';

function AppContent() {
  const location = useLocation();
  const ptClass = location.pathname === '/' ? 'pt-0' : 'pt-20';
  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary via-light to-accent font-sans flex flex-col ${ptClass}`}>
      <Navbar 
        mode={location.pathname === '/' ? 'dark' : 'light'}
        logo={location.pathname === '/' ? AkLogo : AkLogoDark}
      />
      {location.pathname === '/' && (
        <div className="w-full flex justify-center bg-transparent">
          <Carousel />
        </div>
      )}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/destekleyenler" element={<Destekleyenler />} />
          <Route path="/teknolojiler" element={<Teknolojiler />} />
          <Route path="/katkida-bulunanlar" element={<KatkidaBulunanlar />} />
          <Route path="/projeler" element={<GithubPage />} />
          <Route path="/nasil-katki-saglanir" element={<Katki />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="bg-[#1e293b] text-white pt-12 pb-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
          {/* Sol: Logo, slogan, sosyal */}
          <div className="md:col-span-2 flex flex-col items-start justify-between h-full mb-8 md:mb-0">
            <img src={AkLogo} alt="Kamu-AKYS Logo" className="h-10 w-auto mb-4" />
            <div className="mb-6 text-base text-blue-100">Kamuda Açık Kaynak Yazılım ile daha şeffaf, güvenli ve verimli bir gelecek.</div>
            <div className="flex gap-4 text-2xl">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#60a5fa] text-white transition"><FaLinkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#60a5fa] text-white transition"><FaInstagram /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#60a5fa] text-white transition"><FaXTwitter /></a>
              <a href="https://github.com/bugraayan1/KAMU-AKYS" target="_blank" rel="noopener noreferrer" className="hover:text-[#60a5fa] text-white transition"><FaGithub /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#60a5fa] text-white transition"><FaYoutube /></a>
            </div>
          </div>
          {/* Sütunlar */}
          <div>
            <div className="font-semibold text-white mb-3">Çözümler</div>
            <ul className="space-y-2">
              <li><Link to="/projeler" className="hover:text-[#60a5fa] text-blue-100 transition">Projeler</Link></li>
              <li><Link to="/teknolojiler" className="hover:text-[#60a5fa] text-blue-100 transition">Teknolojiler</Link></li>
              <li><Link to="/destekleyenler" className="hover:text-[#60a5fa] text-blue-100 transition">Destekleyenler</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Destek</div>
            <ul className="space-y-2">
              <li><Link to="/nasil-katki-saglanir" className="hover:text-[#60a5fa] text-blue-100 transition">Katkı Sağla</Link></li>
              <li><a href="/docs" className="hover:text-[#60a5fa] text-blue-100 transition">Belgeler</a></li>
              <li><a href="#sss" className="hover:text-[#60a5fa] text-blue-100 transition">Sık Sorulan Sorular</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Kurumsal</div>
            <ul className="space-y-2">
              <li><Link to="/hakkimizda" className="hover:text-[#60a5fa] text-blue-100 transition">Hakkımızda</Link></li>
              <li><a href="mailto:kamuakys@ornek.gov.tr" className="hover:text-[#60a5fa] text-blue-100 transition">İletişim</a></li>
            </ul>
            <div className="font-semibold text-white mb-3 mt-8">Yasal</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#60a5fa] text-blue-100 transition">Kullanım Şartları</a></li>
              <li><a href="#" className="hover:text-[#60a5fa] text-blue-100 transition">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-[#60a5fa] text-blue-100 transition">Lisans</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-blue-200 border-t border-blue-900 pt-6">
          © {new Date().getFullYear()} Kamu-AKYS. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
