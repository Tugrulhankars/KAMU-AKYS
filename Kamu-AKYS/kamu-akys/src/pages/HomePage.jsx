import { FaGithub, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import akLogo from '../assets/Ak.svg';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#e9eef6] via-[#f5f7fa] to-[#dbeafe]">
      {/* Hero Kurumsal Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e3eafc] via-[#f5f7fa] to-[#b6c6e3] opacity-80" />
      <header className="w-full max-w-4xl mx-auto text-center pt-8 pb-20 flex flex-col items-center">
        <img
          src={akLogo}
          alt="Kamu-AKYS Ana Logo"
          className="h-auto w-auto md:h-40  mb-1 drop-shadow-xl mx-auto animate-fade-in"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1e293b] mb-6 leading-tight tracking-tight">
          Kamuda Açık Kaynak <span className="text-[#2563eb] font-black">Yazılım</span> 
        </h1>
        <div className="flex flex-col gap-2 items-center mb-8">
          <span className="text-base md:text-lg font-semibold text-[#2563eb] tracking-wide">“Kamuda Özgürlük, Kaynakta Güç”</span>
          <span className="text-base md:text-lg font-semibold text-[#1e293b] tracking-wide">“Açık Kaynakla Geleceği Kuruyoruz”</span>
          <span className="text-base md:text-lg font-semibold text-[#0e7490] tracking-wide">“Kamu için Şeffaf ve Güvenli Yazılım”</span>
        </div>
        <p className="text-lg md:text-xl text-[#334155] mb-10 max-w-2xl mx-auto">
          Kamu-AKYS, kamuda dijital dönüşüm ve açık kaynak kültürünü yaygınlaştırmak için geliştirilen modern, modüler ve topluluk odaklı bir platformdur.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <a href="/hakkimizda" className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105">Hakkımızda</a>
          <a href="/destekleyenler" className="bg-white text-[#2563eb] px-8 py-3 rounded-full font-semibold shadow-md border border-[#2563eb] hover:bg-[#f1f5f9] transition-all duration-300 hover:scale-105">Destekleyenler</a>
          <a href="/projeler" className="bg-white text-[#2563eb] px-8 py-3 rounded-full font-semibold shadow-md border border-[#2563eb] hover:bg-[#f1f5f9] transition-all duration-300 hover:scale-105">Projeler</a>

          <a href="/katkida-bulunanlar" className="bg-white text-[#334155] px-8 py-3 rounded-full font-semibold shadow-md border border-[#cbd5e1] hover:bg-[#f8fafc] transition-all duration-300 hover:scale-105">Katkıda Bulunanlar</a>
          <a href="/github" className="flex items-center gap-2 bg-[#18181b] hover:bg-[#2563eb] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105 border border-[#18181b] hover:border-[#2563eb]">
            <FaGithub size={22} />
            <span>GitHub</span>
          </a>
          <a href="/teknolojiler" className="bg-white text-[#0e7490] px-8 py-3 rounded-full font-semibold shadow-md border border-[#0e7490] hover:bg-[#f0fdfa] transition-all duration-300 hover:scale-105">Teknolojiler</a>

        </div>
      </header>
      {/* Faydalar Bölümü */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e293b] mb-8">Kamuda Açık Kaynak Yazılımın Faydaları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
            <span className="text-2xl font-bold text-[#2563eb] mb-2">Şeffaflık</span>
            <span className="text-[#334155]">Kodlar herkesin erişimine açık olduğu için güven ve denetlenebilirlik sağlar.</span>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
            <span className="text-2xl font-bold text-[#2563eb] mb-2">Güvenlik</span>
            <span className="text-[#334155]">Topluluk ve uzmanlar tarafından sürekli incelenir, güvenlik açıkları hızlıca tespit edilir.</span>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
            <span className="text-2xl font-bold text-[#2563eb] mb-2">Maliyet Avantajı</span>
            <span className="text-[#334155]">Lisans maliyetleri yoktur, kamu bütçesi daha verimli kullanılır.</span>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
            <span className="text-2xl font-bold text-[#2563eb] mb-2">Yerelleştirme & Esneklik</span>
            <span className="text-[#334155]">İhtiyaca göre özelleştirilebilir, milli çözümler geliştirilebilir.</span>
          </div>
        </div>
        <FAQ />
      </section>
    </main>
  );
}

// Sık Sorulan Sorular Bileşeni
function FAQ() {
  const [open, setOpen] = useState(null);
  const sorular = [
    {
      soru: 'Açık kaynak yazılım nedir?',
      cevap: 'Açık kaynak yazılım, kaynak kodunun herkes tarafından görüntülenebildiği, değiştirilebildiği ve dağıtılabildiği yazılım türüdür.'
    },
    {
      soru: 'Kamuda açık kaynak kullanmak güvenli mi?',
      cevap: 'Evet, açık kaynak yazılımlar topluluk ve uzmanlar tarafından sürekli denetlendiği için güvenlik açıkları daha hızlı tespit edilir.'
    },
    {
      soru: 'Açık kaynak yazılım kullanmak maliyetleri düşürür mü?',
      cevap: 'Lisans maliyeti olmadığı için kamu kurumları için önemli bir tasarruf sağlar.'
    },
    {
      soru: 'Açık kaynak yazılımda destek ve güncelleme nasıl sağlanır?',
      cevap: 'Geniş topluluk desteği ve sürekli güncellemeler ile açık kaynak projeler uzun vadede sürdürülebilirlik sunar.'
    },
  ];
  return (
    <div className="max-w-2xl mx-auto">
      {sorular.map((item, i) => (
        <div key={i} className="mb-3">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full flex justify-between items-center px-6 py-4 rounded-xl bg-white shadow border border-blue-100 text-left font-semibold text-[#1e293b] transition focus:outline-none ${open === i ? 'ring-2 ring-[#2563eb]' : ''}`}
          >
            <span>{item.soru}</span>
            <span className={`ml-4 text-2xl transition-transform ${open === i ? 'rotate-180' : ''}`}>
              <FaChevronDown />
            </span>
          </button>
          {open === i && (
            <div className="px-6 py-3 text-[#334155] bg-blue-50 rounded-b-xl border-t border-blue-100 animate-fade-in mt-4">
              {item.cevap}
            </div>
          )}
        </div>
      ))}
      {/* Katkı Sağlama Accordion */}
      <div className="mb-3">
        <button
          onClick={() => setOpen(open === 'katki' ? null : 'katki')}
          className={`w-full flex justify-between items-center px-6 py-4 rounded-xl bg-white shadow border border-blue-100 text-left font-semibold text-[#1e293b] transition focus:outline-none ${open === 'katki' ? 'ring-2 ring-[#2563eb]' : ''}`}
        >
          <span>Bu projeye nasıl katkı sağlarım?</span>
          <span className={`ml-4 text-2xl transition-transform ${open === 'katki' ? 'rotate-180' : ''}`}>
            <FaChevronDown />
          </span>
        </button>
        {open === 'katki' && (
          <div className="px-6 py-5 text-[#334155] bg-blue-50 rounded-b-xl border-t border-blue-100 animate-fade-in mt-4 flex flex-col gap-4">
            <div>
              Kamu AKYS, açık kaynak geliştiricilere ve kamuya katkı sunmak isteyen herkese açıktır. Katkı sağlamak için teknik uzman olmanıza gerek yok; ister bir yazılımcı, ister bir tasarımcı, isterse sadece önerisi olan bir kullanıcı olun — hepinizin katkısı değerlidir.<br /><br />
              Projeye katkı sağlamak için:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>✅ GitHub üzerinden projeyi forklayabilir, geliştirme yapabilir ve pull request gönderebilirsiniz.</li>
                <li>✅ Hata bildirimi veya öneri sunmak için GitHub'da "Issue" açabilirsiniz.</li>
                <li>✅ Belgeleri (dokümantasyon) güncelleyerek teknik olmayan katkılar da sunabilirsiniz.</li>
                <li>✅ Genç geliştiriciler veya kamu çalışanları olarak fikir ve çözüm önerileriyle sürece dahil olabilirsiniz.</li>
              </ul>
            </div>
            <Link
              to="/nasil-katki-saglanir"
              className="inline-block mt-2 px-6 py-2 rounded-lg bg-[#2563eb] text-white font-semibold shadow hover:bg-[#1e40af] transition"
            >
              Katkı Sağla Sayfasına Git
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 