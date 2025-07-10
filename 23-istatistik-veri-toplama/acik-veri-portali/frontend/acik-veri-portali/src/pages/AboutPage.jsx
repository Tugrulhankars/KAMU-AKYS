import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield, 
  Database, 
  BarChart3, 
  TrendingUp,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import akLogo from '../assets/Ak_dark.png';

const AboutPage = () => {
  const stats = [
    { icon: Database, value: '5,000+', label: 'Veri Seti' },
    { icon: Users, value: '1,000+', label: 'Aktif Kullanıcı' },
    { icon: BarChart3, value: '50,000+', label: 'İndirme' },
    { icon: Globe, value: '100+', label: 'Kurum' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Şeffaflık',
      description: 'Kamu kurumlarının verilerini şeffaf bir şekilde paylaşarak vatandaşların bilgiye erişimini kolaylaştırıyoruz.'
    },
    {
      icon: Database,
      title: 'Veri Kalitesi',
      description: 'Yüksek kaliteli, güncel ve doğrulanmış veriler sunarak güvenilir bilgi kaynağı oluşturuyoruz.'
    },
    {
      icon: Users,
      title: 'Kullanıcı Odaklılık',
      description: 'Kullanıcı deneyimini ön planda tutarak kolay erişilebilir ve anlaşılır bir platform geliştiriyoruz.'
    },
    {
      icon: TrendingUp,
      title: 'Sürekli Gelişim',
      description: 'Teknoloji ve ihtiyaçlar doğrultusunda sürekli olarak platformumuzu geliştiriyor ve iyileştiriyoruz.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20">
                <img src={akLogo} alt="KAMU AKYS Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">KAMU AKYS</span>
              <br />
              <span className="text-gray-700">Hakkında</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              KAMU AKYS projesi kapsamında geliştirilen açık veri portalı, kamu kurumlarının 
              şeffaflık ve veri erişilebilirliği ihtiyaçlarını karşılamak üzere tasarlanmış 
              modern bir platformdur.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Misyonumuz</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Kamu kurumlarının verilerini şeffaf, erişilebilir ve kullanışlı bir şekilde 
                vatandaşlara sunarak, demokratik katılımı artırmak ve veri odaklı karar 
                verme süreçlerini desteklemek.
              </p>
              <div className="flex items-center space-x-2 text-primary-600">
                <Target className="w-5 h-5" />
                <span className="font-medium">Şeffaflık ve Erişilebilirlik</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vizyonumuz</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Türkiye'nin en kapsamlı ve kullanıcı dostu açık veri platformu olarak, 
                veri demokrasisinin gelişmesine öncülük etmek ve dijital dönüşüm sürecine 
                katkıda bulunmak.
              </p>
              <div className="flex items-center space-x-2 text-primary-600">
                <Award className="w-5 h-5" />
                <span className="font-medium">Liderlik ve İnovasyon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              KAMU AKYS projesi, aşağıdaki temel değerler üzerine inşa edilmiştir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-medium border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              KAMU AKYS projesi hakkında sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adres</h3>
              <p className="text-gray-600">Ankara, Türkiye</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@kamuakys.gov.tr</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">+90 (212) 123 45 67</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 