const techs = [
  { name: "React", desc: "Modern kullanıcı arayüzü kütüphanesi" },
  { name: "Tailwind CSS", desc: "Hızlı ve esnek stil oluşturma" },
  { name: "Docker", desc: "Konteyner tabanlı dağıtım" },
  { name: "PostgreSQL", desc: "Açık kaynak veritabanı" },
  { name: ".NET Core", desc: "Kurumsal backend altyapısı" },
  // Diğer teknolojiler...
];

export default function Teknolojiler() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-blue-900 mb-8">Kullanılan Teknolojiler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techs.map((t) => (
          <div key={t.name} className="bg-blue-50 rounded-xl p-6 shadow">
            <div className="text-xl font-semibold text-blue-800 mb-2">{t.name}</div>
            <div className="text-gray-700">{t.desc}</div>
          </div>
        ))}
      </div>
    </main>
  );
} 