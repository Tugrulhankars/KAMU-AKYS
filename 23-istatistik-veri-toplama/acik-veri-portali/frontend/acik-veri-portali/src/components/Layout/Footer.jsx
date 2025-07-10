/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Github,
  ExternalLink
} from 'lucide-react';
import akLogo from '../../assets/Ak.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Veri Setleri', path: '/datasets' },
      { name: 'Kategoriler', path: '/categories' },
      { name: 'Arama', path: '/search' },
      { name: 'API Dokümantasyonu', path: '/api-docs' },
    ],
    resources: [
      { name: 'Hakkımızda', path: '/about' },
      { name: 'Kullanım Kılavuzu', path: '/guide' },
      { name: 'SSS', path: '/faq' },
      { name: 'İletişim', path: '/contact' },
      { name: 'Gizlilik Politikası', path: '/privacy' },
    ],
    support: [
      { name: 'Yardım Merkezi', path: '/help' },
      { name: 'Topluluk', path: '/community' },
      { name: 'Geri Bildirim', path: '/feedback' },
      { name: 'Durum Sayfası', path: '/status' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/kamuakys' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/kamuakys' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/kamuakys' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/kamuakys' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12">
                  <img src={akLogo} alt="KAMU AKYS Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">KAMU AKYS</h3>
                  <p className="text-sm text-gray-300">Açık Veri Portalı</p>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                KAMU AKYS projesi kapsamında geliştirilen açık veri portalı. Kamu kurumları için şeffaflık ve veri erişilebilirliği 
                sağlayan modern platform ile verilerinizi keşfedin, analiz edin ve paylaşın.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>info@kamuakys.gov.tr</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>+90 (212) 123 45 67</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>Ankara, Türkiye</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Platform Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Kaynaklar</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Destek</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <span>API Dokümantasyonu</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} KAMU AKYS - Açık Veri Portalı. Tüm hakları saklıdır.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Kullanım Şartları
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 