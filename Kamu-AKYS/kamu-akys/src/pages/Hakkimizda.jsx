import { FaShieldAlt, FaMoneyBillWave, FaFlag, FaLightbulb, FaSyncAlt, FaUnlockAlt, FaNetworkWired, FaHandshake, FaUserGraduate } from 'react-icons/fa';
import akLogo from '../assets/ak.svg';

export default function Hakkimizda() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e3eafc] via-[#f5f7fa] to-[#b6c6e3] py-16 px-4">
      <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl p-8 md:p-14 border border-blue-100 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2563eb] mb-8 text-center drop-shadow-lg">Kamuda Açık Kaynak Yazılımın Önemi ve Projemizin Amacı</h2>
        <p className="text-gray-700 text-lg mb-6 text-center">
          Dijital dönüşüm sürecinde kamu kurumlarının şeffaflık, güvenlik, sürdürülebilirlik ve maliyet etkinliği gibi temel ilkelere bağlı kalması, vatandaşlara kaliteli hizmet sunabilmesinin anahtarıdır. Bu noktada açık kaynak yazılımlar, kamunun teknolojide dışa bağımlılığını azaltan, denetlenebilirliği artıran ve yerli ekosistemi destekleyen en önemli araçlardan biridir.
        </p>
        <p className="text-gray-700 text-lg mb-10 text-center">
          Bu doğrultuda <b>Kamu Açık Kaynak Yazılım Yönetim Sistemi (Kamu AKYS)</b>, İletişim Başkanlığı Bilgi İşlem Dairesi Başkanlığı tarafından başlatılmış olup; kamuda açık kaynak yazılım kullanımını teşvik etmeyi, yaygınlaştırmayı ve sürdürülebilir hale getirmeyi amaçlamaktadır.
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-6 text-center">Neden Kamuda Açık Kaynak?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card-hover flex items-start gap-4 bg-blue-50 rounded-2xl shadow p-6 border border-blue-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:bg-white cursor-pointer">
            <FaShieldAlt className="text-[#2563eb] text-3xl mt-1" />
            <div>
              <div className="font-bold text-lg mb-1">Şeffaflık ve Güven</div>
              <div className="text-gray-600 text-sm">Kodların açık olması sayesinde sistemlerin nasıl çalıştığı tüm paydaşlar tarafından denetlenebilir. Bu da kamu hizmetlerine duyulan güveni güçlendirir.</div>
            </div>
          </div>
          <div className="card-hover flex items-start gap-4 bg-blue-50 rounded-2xl shadow p-6 border border-blue-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:bg-white cursor-pointer">
            <FaMoneyBillWave className="text-[#2563eb] text-3xl mt-1" />
            <div>
              <div className="font-bold text-lg mb-1">Maliyet Etkinliği</div>
              <div className="text-gray-600 text-sm">Ticari lisans ücretleri yerine geliştirme ve iyileştirme süreçlerine yatırım yapılmasını sağlar. Böylece kamu kaynakları daha verimli kullanılır.</div>
            </div>
          </div>
          <div className="card-hover flex items-start gap-4 bg-blue-50 rounded-2xl shadow p-6 border border-blue-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:bg-white cursor-pointer">
            <FaFlag className="text-[#2563eb] text-3xl mt-1" />
            <div>
              <div className="font-bold text-lg mb-1">Yerli Yetkinlik ve Teknoloji Bağımsızlığı</div>
              <div className="text-gray-600 text-sm">Açık kaynak çözümler, yerli yazılımcıların katkısıyla büyür ve dışa bağımlılık en aza indirgenir. Böylece kamu kurumları özel sektöre ve yabancı teknoloji şirketlerine olan bağımlılığını azaltır.</div>
            </div>
          </div>
          <div className="card-hover flex items-start gap-4 bg-blue-50 rounded-2xl shadow p-6 border border-blue-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:bg-white cursor-pointer">
            <FaLightbulb className="text-[#2563eb] text-3xl mt-1" />
            <div>
              <div className="font-bold text-lg mb-1">İnovasyon ve İş Birliği</div>
              <div className="text-gray-600 text-sm">Açık kaynak yaklaşımı farklı kurumlar arasında bilgi paylaşımını teşvik eder. Kamu kurumları birbirlerinin projelerinden faydalanabilir, ortak çözümler geliştirebilir.</div>
            </div>
          </div>
          <div className="card-hover flex items-start gap-4 bg-blue-50 rounded-2xl shadow p-6 border border-blue-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:bg-white cursor-pointer">
            <FaSyncAlt className="text-[#2563eb] text-3xl mt-1" />
            <div>
              <div className="font-bold text-lg mb-1">Sürdürülebilir Dijital Altyapı</div>
              <div className="text-gray-600 text-sm">Açık kaynak yazılımlar, uzun vadede sahiplenilebilen ve geliştirilebilir bir dijital altyapı sunar. Kurumların kendi ekipleriyle sistemi sürdürülebilir şekilde yönetmesi mümkün hale gelir.</div>
            </div>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-6 text-center">Projemizin Amacı</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card-hover bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow p-6 border border-blue-100 text-lg font-semibold text-[#1e293b] flex items-center gap-4 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:from-blue-50 hover:to-white cursor-pointer">
            <FaUnlockAlt className="text-[#2563eb] text-3xl" />
            <span>Kamuya ait süreçlerin daha açık ve erişilebilir hale gelmesini sağlamak</span>
          </div>
          <div className="card-hover bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow p-6 border border-blue-100 text-lg font-semibold text-[#1e293b] flex items-center gap-4 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:from-blue-50 hover:to-white cursor-pointer">
            <FaNetworkWired className="text-[#2563eb] text-3xl" />
            <span>Yerli yazılımcıların katkılarıyla ulusal bir dijital altyapı oluşturmak</span>
          </div>
          <div className="card-hover bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow p-6 border border-blue-100 text-lg font-semibold text-[#1e293b] flex items-center gap-4 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:from-blue-50 hover:to-white cursor-pointer">
            <FaHandshake className="text-[#2563eb] text-3xl" />
            <span>Farklı kurumların aynı açık kaynak çözümleri üzerinde iş birliği yaparak kamu kaynaklarını etkin kullanmasını sağlamak</span>
          </div>
          <div className="card-hover bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow p-6 border border-blue-100 text-lg font-semibold text-[#1e293b] flex items-center gap-4 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#2563eb] hover:from-blue-50 hover:to-white cursor-pointer">
            <FaUserGraduate className="text-[#2563eb] text-3xl" />
            <span>Genç yazılımcıların bu projeler aracılığıyla kamuda katma değer üretmesini teşvik etmek</span>
          </div>
        </div>
        <p className="text-gray-700 text-lg text-center mt-4">
          Bu projeye sadece bir yazılım değil, kamu bilişiminde bağımsızlık ve güven temelli bir paradigma değişimi olarak yaklaşıyoruz. Kamunun, teknolojide izleyici değil, yön verici olması gerektiğine inanıyoruz.
        </p>
        <div className="flex justify-center mt-10">
          <img src={akLogo} alt="Kamu AKYS" className="h-20 w-auto opacity-75" />
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
} 