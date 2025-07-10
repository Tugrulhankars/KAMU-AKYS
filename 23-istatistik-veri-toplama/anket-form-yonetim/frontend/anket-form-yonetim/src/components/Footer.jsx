import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Kamu-AKYS Anket Yönetim Sistemi. Tüm Hakları Saklıdır.</p>
        <p className="text-sm mt-1">Açık Kaynak Kodlu Kamu Yönetim Projesi</p>
      </div>
    </footer>
  );
};

export default Footer; 