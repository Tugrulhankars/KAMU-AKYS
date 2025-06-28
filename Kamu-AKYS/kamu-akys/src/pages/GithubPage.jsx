import { useState } from 'react';
import { FaGithub, FaChevronDown, FaUserTie, FaMoneyCheckAlt, FaBoxes, FaFileAlt, FaComments, FaUsers, FaCogs, FaChartBar, FaServer, FaCloud, FaHeartbeat, FaCity, FaGraduationCap, FaBalanceScale, FaMedkit, FaTractor, FaLeaf, FaTruck, FaBolt, FaHandsHelping, FaLandmark, FaFutbol, FaChartPie, FaExchangeAlt, FaBuilding, FaReceipt, FaBriefcase, FaLightbulb, FaBroadcastTower, FaShieldAlt, FaLayerGroup, FaCommentDots } from 'react-icons/fa';

const moduller = [
  {
    modul: 'İnsan Kaynakları Yönetimi Sistemleri',
    icon: <FaUserTie className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'İzin Yönetim Sistemi',
      'Personel Bilgi Yönetim Sistemi',
      'Vardiya ve Mesai Yönetim Sistemi',
      'Eğitim Yönetim Sistemi',
    ],
  },
  {
    modul: 'Mali İşler ve Muhasebe Yazılımları',
    icon: <FaMoneyCheckAlt className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Bütçe Yönetim Sistemi',
      'Muhasebe ve Mali Raporlama Sistemi',
      'Satın Alma ve Tedarik Yönetim Sistemi',
      'Bordro ve Maaş Yönetim Sistemi',
    ],
  },
  {
    modul: 'Envanter ve Demirbaş Yönetimi',
    icon: <FaBoxes className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Demirbaş Takip Sistemi',
      'Stok Yönetim Sistemi',
      'Araç Filo Yönetim Sistemi',
    ],
  },
  {
    modul: 'Belge Yönetim Sistemleri',
    icon: <FaFileAlt className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Elektronik Belge Yönetim Sistemi (EBYS)',
      'Evrak Takip Sistemi',
      'İmza Sirküleri Sistemi',
    ],
  },
  {
    modul: 'İletişim ve Koordinasyon Araçları',
    icon: <FaComments className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'İç İletişim Platformu',
      'Toplantı Yönetim Sistemi',
      'Proje Yönetim Sistemi',
    ],
  },
  {
    modul: 'Vatandaş Hizmetleri',
    icon: <FaUsers className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Randevu Yönetim Sistemi',
      'Dilekçe ve Şikayet Yönetim Sistemi',
      'Bilgi Edinme Sistemi',
    ],
  },
  {
    modul: 'Operasyonel Yazılımlar',
    icon: <FaCogs className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Çay Ocağı Yönetim Sistemi',
      'Güvenlik Yönetim Sistemi',
      'Temizlik ve Bakım Yönetim Sistemi',
      'Yemekhane Yönetim Sistemi',
      'Kütüphane Yönetim Sistemi',
    ],
  },
  {
    modul: 'Raporlama ve Analitik Araçları',
    icon: <FaChartBar className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'İş Zekası ve Raporlama Sistemi',
      'Performans Yönetim Sistemi',
    ],
  },
  {
    modul: 'Teknik Altyapı Yazılımları',
    icon: <FaServer className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Sistem İzleme ve Yönetim Sistemi',
      'Yedekleme ve Arşivleme Sistemi',
      'Kullanıcı ve Yetki Yönetim Sistemi',
    ],
  },
  {
    modul: 'Bulut ve Veri Yönetimi Sistemleri',
    icon: <FaCloud className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Bulut Depolama Sistemi',
      'Dosya Paylaşım Platformu',
      'Yedekleme ve Senkronizasyon Sistemi',
      'Veri Gölü Platformu',
      'Büyük Veri Analitik Sistemi',
      'Nesne Depolama Sistemi',
      'Bulut Hesaplama Platformu',
      'Konteyner Orkestrasyon Sistemi',
    ],
  },
  {
    modul: 'Sağlık ve Pandemi Yönetimi',
    icon: <FaHeartbeat className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Salgın Takip ve Erken Uyarı Sistemi',
      'Aşı Takip ve Randevu Sistemi',
      'Temaslı Takip Sistemi',
      'Sağlık Veri Analitik Platformu',
      'Hastane Doluluk İzleme Sistemi',
    ],
  },
  {
    modul: 'Akıllı Şehir Sistemleri',
    icon: <FaCity className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Trafik Yoğunluk İzleme Sistemi',
      'Otopark Yönetim Sistemi',
      'Çevre Kirliliği İzleme Platformu',
      'Enerji Tüketimi İzleme Sistemi',
      'Akıllı Aydınlatma Kontrol Sistemi',
    ],
  },
  {
    modul: 'E-Öğrenme ve Eğitim',
    icon: <FaGraduationCap className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Uzaktan Eğitim Platformu',
      'Sınav Yönetim Sistemi',
      'Öğrenci Takip Sistemi',
      'Dijital Kütüphane Platformu',
      'İnteraktif Eğitim İçerik Yönetimi',
    ],
  },
  {
    modul: 'Hukuk ve Adalet Sistemleri',
    icon: <FaBalanceScale className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Dava Takip Sistemi',
      'Elektronik Tebligat Sistemi',
      'Hukuki Doküman Yönetimi',
      'Mahkeme Randevu Sistemi',
      'İcra Takip Platformu',
    ],
  },
  {
    modul: 'Afet ve Acil Durum Yönetimi',
    icon: <FaMedkit className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Afet Koordinasyon Merkezi',
      'Acil Durum Haberleşme Sistemi',
      'Kayıp Kişi Takip Sistemi',
      'Yardım Dağıtım Koordinasyon Platformu',
      'Risk Haritalama Sistemi',
    ],
  },
  {
    modul: 'Tarım ve Hayvancılık',
    icon: <FaTractor className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Çiftçi Kayıt Sistemi',
      'Ürün Takip ve İzlenebilirlik Sistemi',
      'Hayvan Kimlik Sistemi',
      'Zirai İlaç Takip Sistemi',
      'Hava Durumu ve Erken Uyarı Sistemi',
    ],
  },
  {
    modul: 'Çevre ve Doğa Koruma',
    icon: <FaLeaf className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Atık Yönetim Sistemi',
      'Su Kalitesi İzleme Platformu',
      'Hava Kalitesi İzleme Sistemi',
      'Geri Dönüşüm Takip Sistemi',
      'Karbon Ayak İzi Hesaplama',
    ],
  },
  {
    modul: 'Ulaştırma ve Lojistik',
    icon: <FaTruck className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Toplu Taşıma Yönetim Sistemi',
      'Araç Takip ve Rota Optimizasyonu',
      'Yük Taşımacılığı Koordinasyon Platformu',
      'Denizcilik İşlemleri Yönetimi',
      'Havalimanı Operasyon Sistemi',
    ],
  },
  {
    modul: 'Enerji Yönetimi',
    icon: <FaBolt className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Elektrik Tüketim İzleme Sistemi',
      'Yenilenebilir Enerji Takip Platformu',
      'Enerji Verimliliği Analiz Sistemi',
      'Akıllı Sayaç Yönetimi',
      'Enerji Dağıtım Optimizasyonu',
    ],
  },
  {
    modul: 'Sosyal Hizmetler',
    icon: <FaHandsHelping className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Sosyal Yardım Takip Sistemi',
      'Engelli Vatandaş Hizmetleri Platformu',
      'Yaşlı Bakım Takip Sistemi',
      'Çocuk Koruma Sistemi',
      'Aile Danışmanlığı Yönetimi',
    ],
  },
  {
    modul: 'Kültür ve Turizm',
    icon: <FaLandmark className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Müze ve Ören Yeri Yönetimi',
      'Kültürel Etkinlik Takvimi',
      'Turist Bilgilendirme Sistemi',
      'Sanal Müze Platformu',
      'Kültürel Miras Envanter Sistemi',
    ],
  },
  {
    modul: 'Spor ve Gençlik',
    icon: <FaFutbol className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Spor Tesisi Rezervasyon Sistemi',
      'Sporcu Lisans ve Takip Sistemi',
      'Gençlik Kampı Yönetimi',
      'Spor Müsabaka Organizasyon Platformu',
      'Antrenör Eğitim Takip Sistemi',
    ],
  },
  {
    modul: 'İstatistik ve Veri Toplama',
    icon: <FaChartPie className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Anket ve Form Yönetim Sistemi',
      'Nüfus Sayım Platformu',
      'İstatistiki Veri Görselleştirme',
      'Veri Toplama Mobil Uygulaması',
      'Açık Veri Portalı',
    ],
  },
  {
    modul: 'Gümrük ve Ticaret',
    icon: <FaExchangeAlt className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Gümrük İşlemleri Otomasyonu',
      'İhracat/İthalat Takip Sistemi',
      'Ticaret Sicili Yönetimi',
      'E-Fatura Entegrasyon Platformu',
      'Dış Ticaret İstatistik Sistemi',
    ],
  },
  {
    modul: 'Belediye Hizmetleri',
    icon: <FaBuilding className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Mezarlık Bilgi Sistemi',
      'Nikah Salonu Rezervasyon Sistemi',
      'İmar Durumu Sorgulama',
      'Zabıta Yönetim Sistemi',
      'Kent Konseyi Platformu',
    ],
  },
  {
    modul: 'Vergi ve Gelir Yönetimi',
    icon: <FaReceipt className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Vergi Beyan Sistemi',
      'Tahsilat Takip Platformu',
      'Vergi Borcu Yapılandırma',
      'E-Haciz Sistemi',
      'Gelir Analiz ve Tahmin Sistemi',
    ],
  },
  {
    modul: 'İstihdam ve İş Gücü',
    icon: <FaBriefcase className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'İş Arayan-İşveren Eşleştirme Platformu',
      'Mesleki Yeterlilik Takip Sistemi',
      'İşsizlik Sigortası Yönetimi',
      'Staj ve İşbaşı Eğitim Takibi',
      'İş Sağlığı ve Güvenliği Yönetimi',
    ],
  },
  {
    modul: 'Ar-Ge ve İnovasyon',
    icon: <FaLightbulb className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Proje Başvuru ve Takip Sistemi',
      'Patent ve Fikri Mülkiyet Yönetimi',
      'Ar-Ge Laboratuvar Yönetimi',
      'İnovasyon Fikir Havuzu',
      'Teknoloji Transfer Ofisi Platformu',
    ],
  },
  {
    modul: 'Medya ve İletişim',
    icon: <FaBroadcastTower className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Basın Bülteni Dağıtım Sistemi',
      'Sosyal Medya Yönetim Platformu',
      'Kurumsal TV/Radyo Yayın Sistemi',
      'Dijital Arşiv Yönetimi',
      'Halkla İlişkiler Takip Sistemi',
    ],
  },
  {
    modul: 'Özel Güvenlik ve İstihbarat',
    icon: <FaShieldAlt className="text-[#2563eb] mr-2" size={28} />,
    projeler: [
      'Olay Yönetim ve Raporlama Sistemi',
      'Kriz Masası Koordinasyon Platformu',
      'Güvenlik Kamera Analitik Sistemi',
      'Siber Tehdit İstihbarat Platformu',
      'Kritik Altyapı İzleme Sistemi',
    ],
  },
];

export default function GithubPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleModule = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#e9eef6] via-[#f5f7fa] to-[#dbeafe] py-16 px-4">
      <div className="flex flex-col items-center gap-4 mb-10">
        <FaGithub size={72} className="text-[#1e293b] drop-shadow-lg" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b]">Kamu-AKYS GitHub Modülleri ve Projeleri</h2>
        <p className="text-lg text-[#334155]">Tüm modüller ve projeler aşağıda listelenmiştir.</p>
      </div>
      {/* Bilgilendirme Kutusu */}
      <div className="w-full max-w-3xl mx-auto mb-8 border border-blue-200 border-l-8 border-l-[#2563eb] bg-white rounded-xl p-6 flex flex-col gap-2 shadow">
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <FaLayerGroup className="text-[#2563eb]" size={24} />
          Tüm Modüller ve Projeler
        </h3>
        <p className="text-gray-700">Tüm mevcut modüller ve projeler aşağıda listelenmiştir. Yeni bir modül veya proje öneriniz varsa, lütfen GitHub üzerinden <strong>Issue</strong> oluşturarak bizimle paylaşın.</p>
        <a
          href="https://github.com/kamu-akys/your-repo-name/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full justify-center mt-2 px-5 py-3 rounded-md bg-[#2563eb] text-white font-semibold shadow hover:bg-[#1e40af] hover:scale-105 hover:shadow-lg transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
        >
          <FaCommentDots size={20} /> GitHub'da Öneri Oluştur
        </a>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        {moduller.map((modul, i) => (
          <div key={i} className="mb-4 border rounded-2xl bg-white shadow">
            <button
              onClick={() => toggleModule(i)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-2xl font-bold text-[#2563eb] focus:outline-none transition rounded-2xl hover:bg-blue-50"
            >
              <span className="flex items-center">{modul.icon}{modul.modul}</span>
              <FaChevronDown className={`ml-2 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#1e293b]' : 'text-[#2563eb]'}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 py-4 px-8' : 'max-h-0 py-0 px-8'}`}
              style={{ background: openIndex === i ? '#f1f5f9' : 'transparent', borderRadius: openIndex === i ? '0 0 1rem 1rem' : '0 0 1rem 1rem' }}
            >
              {openIndex === i && (
                <ul className="space-y-2">
                  {modul.projeler.map((proje, j) => (
                    <li key={j} className="flex items-center gap-2 text-[#1e293b] text-lg">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#2563eb] mr-2"></span>
                      {proje}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 