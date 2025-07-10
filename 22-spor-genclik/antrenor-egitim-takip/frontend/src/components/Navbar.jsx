import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow flex justify-between items-center px-8 py-4">
      <div className="font-bold text-xl text-blue-700">Antrenör Eğitim Takip</div>
      <div className="space-x-4">
        <a href="/" className="text-gray-700 hover:text-blue-700">Anasayfa</a>
        <a href="#" className="text-gray-700 hover:text-blue-700">Hakkında</a>
        <a href="/login" className="text-gray-700 hover:text-blue-700">Giriş</a>
        <a href="/register" className="text-gray-700 hover:text-blue-700">Kayıt Ol</a>
      </div>
    </nav>
  );
} 