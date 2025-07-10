import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-xl font-bold mb-2">Spor Müsabaka Organizasyonu</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          Modern, güvenli ve kullanıcı dostu spor organizasyon yönetim sistemi.
        </p>
        <p className="text-gray-500 text-xs mt-2">© 2024 KAMU-AKYS. Tüm hakları saklıdır.</p>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-blue-400" title="Facebook"><Facebook /></a>
        <a href="#" className="hover:text-blue-400" title="Twitter"><Twitter /></a>
        <a href="#" className="hover:text-pink-400" title="Instagram"><Instagram /></a>
        <a href="#" className="hover:text-blue-300" title="Linkedin"><Linkedin /></a>
      </div>
    </div>
  </footer>
);

export default Footer; 