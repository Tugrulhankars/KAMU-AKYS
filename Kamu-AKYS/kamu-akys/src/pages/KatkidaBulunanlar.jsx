import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const contributors = [
  {
    name: "Ahmet Yılmaz",
    role: "Proje Yöneticisi",
    image: "/team/ahmet.jpg",
    linkedin: "https://linkedin.com/in/ahmetyilmaz",
    x: "https://x.com/ahmetyilmaz"
  },
  {
    name: "Ayşe Demir",
    role: "Frontend Geliştirici",
    image: "/team/ayse.jpg",
    linkedin: "https://linkedin.com/in/aysedemir",
    x: "https://x.com/aysedemir"
  },
  {
    name: "Mehmet Kaya",
    role: "Backend Geliştirici",
    image: "/team/mehmet.jpg",
    linkedin: "https://linkedin.com/in/mehmetkaya",
    x: "https://x.com/mehmetkaya"
  },
  // Diğer katkıcılar...
];

export default function KatkidaBulunanlar() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Katkıda Bulunanlar</h2>
      <p className="text-gray-700 mb-10 max-w-2xl text-center mx-auto">
        Kamu AKYS projesine katkı sağlayan tüm gönüllü geliştiricilere, tasarımcılara, test uzmanlarına ve destek veren herkese içtenlikle teşekkür ederiz.<br />
        <br />
        Aşağıda, projeye emek veren katkı sunucular listelenmiştir.<br />
        Katkılarınız sayesinde kamuda açık kaynak kültürünü birlikte büyütüyoruz.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {contributors.map((c) => (
          <div key={c.name} className="flex flex-col items-center">
            <img
              src={c.image}
              alt={c.name}
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
            />
            <div className="text-lg font-bold text-gray-900">{c.name}</div>
            <div className="text-sm text-gray-500 mb-3">{c.role}</div>
            <div className="flex gap-4 mt-2">
              <a href={c.x} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-colors">
                <FaXTwitter />
              </a>
              <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-2xl transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
} 