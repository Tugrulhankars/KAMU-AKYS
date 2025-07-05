import İl from "../assets/İl.svg";
import TCC from "../assets/T.C.jpg";
import TUBITAK from "../assets/tübitak.jpg";
import HAVELSAN from "../assets/havelsan.png";
import ASELSAN from "../assets/aselsan.png";
import ME from "../assets/milli_eğitim.png";
import ST from "../assets/sanayi_bakanlığı.png";
import BV from "../assets/bilşim_vadisi.png";

const kurumlar =  [
  { name: "T.C. İletişim Başkanlığı", logo: İl, url: "https://www.iletisim.gov.tr/" },
  { name: "T.C. Cumhurbaşkanlığı", logo: TCC, url: "https://www.tccb.gov.tr/" },
  { name: "TÜBİTAK", logo: TUBITAK, url: "https://www.tubitak.gov.tr/" },
  { name: "HAVELSAN", logo: HAVELSAN, url: "https://www.havelsan.com.tr/" },
  { name: "ASELSAN", logo: ASELSAN, url: "https://www.aselsan.com.tr/" },
  { name: "T.C. Milli Eğitim Bakanlığı", logo: ME, url: "https://www.meb.gov.tr/" },
  { name: "T.C. Sanayi ve Teknoloji Bakanlığı", logo: ST, url: "https://www.sanayi.gov.tr/" },
  { name: "Bilişim Vadisi", logo: BV, url: "https://www.bilisimvadisi.com.tr/" },
];


export default function Destekleyenler() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">Destekleyen Kurumlar</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-center items-center">
        {kurumlar.map((k) => (
          <a
            key={k.name}
            href={k.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center bg-white rounded-2xl shadow-md p-6 border border-blue-100 hover:shadow-xl hover:border-[#2563eb] transition-all duration-300 cursor-pointer"
          >
            <img
              src={k.logo}
              alt={k.name}
              className="h-20 w-auto mb-3 object-contain group-hover:scale-110 group-hover:drop-shadow-lg transition-transform duration-300"
              loading="lazy"
            />
            <span className="text-blue-800 font-semibold text-center text-sm group-hover:text-[#2563eb] transition-colors duration-300">{k.name}</span>
          </a>
        ))}
      </div>
    </main>
  );
} 