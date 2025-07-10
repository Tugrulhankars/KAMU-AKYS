import React from "react";

const cards = [
  { title: "Kolay Takip", desc: "Eğitimlerinizi ve antrenörlerinizi tek panelden yönetin." },
  { title: "Raporlama", desc: "Detaylı raporlar ve analizlerle gelişimi izleyin." },
  { title: "Kullanıcı Dostu", desc: "Modern ve sade arayüz ile hızlı kullanım." },
];

export default function InfoCards() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 py-12">
      {cards.map((c, i) => (
        <div key={i} className="bg-white shadow rounded-lg p-6 w-full md:w-72 mx-auto">
          <h3 className="font-semibold text-lg mb-2 text-blue-700">{c.title}</h3>
          <p className="text-gray-600">{c.desc}</p>
        </div>
      ))}
    </div>
  );
} 