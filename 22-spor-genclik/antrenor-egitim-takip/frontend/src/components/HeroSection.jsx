import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Antrenör Eğitim Takip Sistemi</h1>
      <p className="text-lg text-gray-700 mb-6">Eğitim süreçlerinizi kolayca yönetin, takip edin ve raporlayın.</p>
      <a href="/register" className="bg-blue-700 text-white px-6 py-2 rounded shadow hover:bg-blue-800">Hemen Başla</a>
    </section>
  );
} 