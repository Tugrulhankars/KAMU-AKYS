import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaUsers, FaCogs, FaStar, FaHandsHelping } from 'react-icons/fa';
import akLogo from '../assets/Ak.png';

const slides = [
  {
    title: 'Kamuda Açık Kaynak Vizyonu',
    desc: 'Şeffaf, güvenli ve sürdürülebilir dijital kamu için açık kaynak yazılımı yaygınlaştırıyoruz.',
    icon: <img src={akLogo} alt="Kamu-AKYS Logo" className="h-16 mb-4 mx-auto drop-shadow-lg" />,
    bg: 'bg-gradient-to-r from-[#2563eb] via-[#1e293b] to-[#2563eb]'
  },
  {
    title: 'Avantaj: Güvenlik ve Şeffaflık',
    desc: 'Kodlar herkesin erişimine açık olduğu için güven ve denetlenebilirlik sağlar.',
    icon: <FaCogs className="text-white text-5xl mb-4 drop-shadow-lg" />,
    bg: 'bg-gradient-to-r from-[#0e7490] via-[#2563eb] to-[#1e293b]'
  },
  {
    title: 'Öne Çıkan Modül: Personel Bilgi Yönetimi',
    desc: 'Kamu personel süreçlerini dijitalleştiren, entegre ve esnek bir çözüm.',
    icon: <FaUsers className="text-white text-5xl mb-4 drop-shadow-lg" />,
    bg: 'bg-gradient-to-r from-[#1e293b] via-[#2563eb] to-[#0ea5e9]'
  },
  {
    title: 'Topluluğa Katıl!',
    desc: 'Geliştirici, tasarımcı veya kullanıcı olarak projeye katkı sunabilirsin. Birlikte büyüyoruz!',
    icon: <FaHandsHelping className="text-white text-5xl mb-4 drop-shadow-lg" />,
    bg: 'bg-gradient-to-r from-[#2563eb] via-[#0e7490] to-[#1e293b]'
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  // Otomatik geçiş efekti
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-none h-[340px] md:h-[600px] overflow-hidden select-none">
      <div className={`absolute inset-0 transition-all duration-700 ${slides[current].bg}`}></div>
      <div className="absolute inset-0 bg-black/30" /> {/* Okunabilirlik için overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {slides[current].icon}
        <h3 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{slides[current].title}</h3>
        <p className="text-lg md:text-2xl font-medium drop-shadow-lg max-w-2xl mx-auto">{slides[current].desc}</p>
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-[#2563eb] rounded-full p-2 shadow transition-all border border-white z-20">
        <FaChevronLeft size={26} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-[#2563eb] rounded-full p-2 shadow transition-all border border-white z-20">
        <FaChevronRight size={26} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-200 border border-white ${i === current ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 