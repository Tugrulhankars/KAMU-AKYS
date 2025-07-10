import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

export default function Navbar({ mode = 'dark', logo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  // Renkler
  const textColor = mode === 'dark' ? 'text-white' : 'text-[#1e293b]';
  const iconColor = mode === 'dark' ? 'text-white' : 'text-[#1e293b]';
  const linkHover = mode === 'dark' ? 'hover:bg-white/20' : 'hover:bg-[#2563eb]/10';

  return (
    <header className={
      'bg-transparent backdrop-blur-md fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/20 drop-shadow-lg'
    }>
      <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3 group" title="Anasayfa">
            <div className="h-20 w-40 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Kamu-AKYS Logo"
                className={`max-h-full max-w-full object-contain drop-shadow-lg transition-all duration-300 ${logoHover ? 'scale-110 drop-shadow-xl' : 'scale-100'} group-hover:scale-110 group-hover:drop-shadow-xl`}
                onMouseEnter={() => setLogoHover(true)}
                onMouseLeave={() => setLogoHover(false)}
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex lg:gap-x-10">
            <Link to="/" className={`text-sm font-semibold px-3 py-2 rounded transition drop-shadow-md ${textColor} ${linkHover}`}>Anasayfa</Link>
            <Link to="/hakkimizda" className={`text-sm font-semibold px-3 py-2 rounded transition drop-shadow-md ${textColor} ${linkHover}`}>Hakkımızda</Link>
            <Link to="/destekleyenler" className={`text-sm font-semibold px-3 py-2 rounded transition drop-shadow-md ${textColor} ${linkHover}`}>Destekleyenler</Link>
            <Link to="/teknolojiler" className={`text-sm font-semibold px-3 py-2 rounded transition drop-shadow-md ${textColor} ${linkHover}`}>Teknolojiler</Link>
            <Link to="/katkida-bulunanlar" className={`text-sm font-semibold px-3 py-2 rounded transition drop-shadow-md ${textColor} ${linkHover}`}>Katkıda Bulunanlar</Link>
            <Link to="/nasil-katki-saglanir" className={`text-sm font-semibold px-3 py-2 rounded transition drop-shadow-md ${textColor} ${linkHover}`}>Katkı Sağla</Link>
          </div>
          <a
            href="https://github.com/bugraayan1/KAMU-AKYS"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:inline-flex items-center justify-center rounded-full p-2 transition border ml-2 ${iconColor} ${linkHover}`}
            title="GitHub Projeleri"
          >
            <FaGithub size={28} className={iconColor} />
          </a>
          <Link
            to="/projeler"
            className={`hidden lg:inline-flex items-center justify-center rounded-full px-4 py-2 transition border ml-2 font-semibold text-sm ${textColor} ${linkHover}`}
            title="Projeler"
          >
            Projeler
          </Link>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${textColor}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Menüyü Aç</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
        {
          /*
           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className={`text-sm font-semibold px-3 py-2 rounded transition ${textColor} ${linkHover}`}>Giriş Yap <span aria-hidden="true">&rarr;</span></a>
           </div>
          */ 
        }
       
      </nav>
      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 right-0 w-72 max-w-full bg-gradient-to-b from-[#1e293b] to-[#2563eb] p-6 shadow-2xl rounded-l-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <img className="h-8 w-auto" src={logo} alt="Kamu-AKYS Logo" />
                <span className="font-bold text-lg text-white">Kamu-AKYS</span>
              </Link>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-white" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Menüyü Kapat</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <Link to="/" className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
              <Link to="/hakkimizda" className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20" onClick={() => setMobileMenuOpen(false)}>Hakkımızda</Link>
              <Link to="/destekleyenler" className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20" onClick={() => setMobileMenuOpen(false)}>Destekleyenler</Link>
              <Link to="/teknolojiler" className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20" onClick={() => setMobileMenuOpen(false)}>Teknolojiler</Link>
              <Link to="/katkida-bulunanlar" className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20" onClick={() => setMobileMenuOpen(false)}>Katkıda Bulunanlar</Link>
              <Link to="/nasil-katki-saglanir" className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20" onClick={() => setMobileMenuOpen(false)}>Katkı Sağla</Link>
              <a
                href="https://github.com/bugraayan1/KAMU-AKYS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20"
              >
                <FaGithub size={22} />
                GitHub Projeleri
              </a>
              <Link
                to="/projeler"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition hover:bg-blue-600/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projeler
              </Link>
              <a href="#" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white transition hover:bg-blue-600/20">Giriş Yap</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 