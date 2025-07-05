import { FaCodeBranch, FaGitAlt, FaPaperPlane, FaBug, FaBook, FaEnvelope, FaGithub, FaHeart, FaPlusCircle, FaExclamationTriangle, FaFileAlt, FaFlask, FaComments, FaPaintBrush } from 'react-icons/fa';
import akLogo from '../assets/ak.svg';

export default function Katki() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e3eafc] via-[#f5f7fa] to-[#b6c6e3] py-16 px-4">
      <div className="w-full max-w-5xl bg-white/95 rounded-3xl shadow-2xl p-8 md:p-14 border border-blue-100 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2563eb] mb-6 text-center drop-shadow-lg">
          <span className="text-5xl md:text-6xl mr-3"></span>Kamu AKYS'ye Nasıl Katkı Sağlanır?
        </h1>
        <p className="text-gray-700 text-lg mb-10 text-center max-w-3xl mx-auto">
          Kamu AKYS açık kaynak bir projedir ve tüm geliştiricilerin katkılarına açıktır. Eğer siz de bu projeye katkı sunmak istiyorsanız, aşağıdaki adımları takip ederek sürece kolayca dahil olabilirsiniz.
        </p>

        {/* Katkı Türleri */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-6 text-center"> Katkı Türleri</h2>
          <p className="text-center text-gray-600 mb-8">Projeye şu yollarla katkı sağlayabilirsiniz:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="katki-karti"><FaPlusCircle className="text-[#2563eb] text-2xl" /><span>Yeni özellikler geliştirmek</span></div>
            <div className="katki-karti"><FaBug className="text-[#2563eb] text-2xl" /><span>Hataları tespit edip düzeltmek</span></div>
            <div className="katki-karti"><FaFileAlt className="text-[#2563eb] text-2xl" /><span>Belgeleri iyileştirmek</span></div>
            <div className="katki-karti"><FaFlask className="text-[#2563eb] text-2xl" /><span>Test eklemek</span></div>
            <div className="katki-karti"><FaComments className="text-[#2563eb] text-2xl" /><span>Geri bildirim paylaşmak</span></div>
            <div className="katki-karti"><FaPaintBrush className="text-[#2563eb] text-2xl" /><span>Arayüz/UX katkıları sunmak</span></div>
          </div>
        </div>

        {/* Katkı Süreci */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-8 text-center"> Katkı Süreci</h2>
          <ol className="relative border-l-2 border-blue-200 ml-4">
            <li className="mb-10 ml-8 surec-adimi">
              <span className="surec-ikon"><FaCodeBranch /></span>
              <h3 className="font-bold text-xl text-gray-800">1. Projeyi Fork'layın</h3>
              <p className="text-gray-600">GitHub üzerinde projeyi kendi hesabınıza kopyalayın.  GitHub sayfamızdan "Fork" butonuna tıklayın.</p>
            </li>
            <li className="mb-10 ml-8 surec-adimi">
              <span className="surec-ikon"><FaGitAlt /></span>
              <h3 className="font-bold text-xl text-gray-800">2. Projeyi Klonlayın ve Branch Oluşturun</h3>
              <p className="text-gray-600 mb-2">Terminalde aşağıdaki komutları çalıştırın:</p>
              <pre className="code-block"><code>git clone https://github.com/kullanici-adi/kamu-akys.git<br/>cd kamu-akys<br/>git checkout -b ozellik/yeni-ozellik-adi</code></pre>
            </li>
             <li className="mb-10 ml-8 surec-adimi">
              <span className="surec-ikon"><FaPaperPlane /></span>
              <h3 className="font-bold text-xl text-gray-800">3. Geliştirme Yapın, Commit ve Push Edin</h3>
               <p className="text-gray-600 mb-2">Değişikliklerinizi yapıp kaydedin:</p>
              <pre className="code-block"><code>git commit -m "Yeni özellik: kullanıcı kayıt sistemi eklendi"<br/>git push origin ozellik/yeni-ozellik-adi</code></pre>
            </li>
            <li className="ml-8 surec-adimi">
              <span className="surec-ikon"><FaPaperPlane /></span>
              <h3 className="font-bold text-xl text-gray-800">4. Pull Request (PR) Gönderin</h3>
              <p className="text-gray-600">GitHub'da orijinal projeye dönerek yeni bir "Pull Request" açın. Değişikliklerinizi ve nedenlerini net bir şekilde açıklayın.</p>
            </li>
          </ol>
        </div>
        
        {/* Hata Bildirimi */}
        <div className="mb-12 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <h2 className="text-2xl font-bold text-amber-800 mb-3 flex items-center gap-3"><FaExclamationTriangle /> Hata Bildirimi</h2>
          <p className="text-amber-700">
            Bir hata ile karşılaştıysanız, GitHub'daki <a href="#" className="font-bold underline hover:text-amber-900">Issue Sayfası</a> üzerinden bildirim yapabilirsiniz. Lütfen hatanın nasıl oluştuğunu, beklenen ve gerçekleşen davranışı ve varsa ekran görüntülerini ekleyin.
          </p>
        </div>

        {/* Kurallar ve İletişim */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><FaBook /> Kurallar ve Standartlar</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Kod okunabilir ve sade olmalı.</li>
              <li>PR gönderirken küçük, odaklı değişiklikler tercih edilmeli.</li>
              <li>Geliştirme sürecinde lisansa uygun hareket edilmeli.</li>
              <li>Ana (main/master) branch'e doğrudan PR gönderilmemeli.</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><FaEnvelope /> İletişim</h2>
            <ul className="text-gray-700 space-y-2">
              <li><strong>E-posta:</strong> kamuakys@ornek.gov.tr</li>
              <li><a href="https://github.com/bugraayan1/KAMU-AKYS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600"><strong><FaGithub /> GitHub:</strong> github.com/bugraayan1/KAMU-AKYS</a></li>
            </ul>
          </div>
        </div>

        {/* Teşekkür */}
        <div className="text-center p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2"> Teşekkürler!</h2>
          <p className="text-lg">
            Bu projeye katkı sunarak kamuda açık kaynak kültürünü birlikte büyütüyoruz. <br/> Şeffaf, bağımsız ve yerli teknoloji üretimi için senin katkın çok değerli! 🇹🇷
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <img src={akLogo} alt="Kamu AKYS" className="h-20 w-auto opacity-75" />
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .katki-karti {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background-color: #f0f4ff;
          border-radius: 0.75rem;
          font-weight: 600;
          color: #374151;
          border: 1px solid #e0e7ff;
          transition: all 0.3s ease;
        }
        .katki-karti:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          background-color: white;
          border-color: #4f46e5;
        }
        .surec-adimi {
            padding-left: 1rem;
        }
        .surec-ikon {
            position: absolute;
            left: -13px;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 26px;
            height: 26px;
            background-color: white;
            border: 2px solid #2563eb;
            border-radius: 9999px;
            color: #2563eb;
        }
        .code-block {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0.5rem;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.9em;
          overflow-x: auto;
          white-space: pre-wrap;
        }
      `}</style>
    </main>
  );
} 