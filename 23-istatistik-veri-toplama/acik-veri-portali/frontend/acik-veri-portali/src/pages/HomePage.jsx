import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, 
  Search, 
  BarChart3, 
  Download, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  ArrowRight,
  Play,
  Star,
  CheckCircle
} from 'lucide-react';
import { useQuery } from 'react-query';
import { dashboardAPI, dataSetAPI } from '../services/api';
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import PopularDataSets from '../components/Home/PopularDataSets';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import CTASection from '../components/Home/CTASection';

const HomePage = () => {
  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery(
    'dashboard-stats',
    dashboardAPI.getStats,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Fetch popular datasets
  const { data: popularDatasets, isLoading: datasetsLoading } = useQuery(
    'popular-datasets',
    dataSetAPI.getPopular,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const features = [
    {
      icon: Database,
      title: 'Kapsamlı Veri Setleri',
      description: 'Binlerce kamu veri setine kolay erişim ve analiz imkanı.',
      color: 'primary'
    },
    {
      icon: Search,
      title: 'Gelişmiş Arama',
      description: 'Akıllı filtreleme ve arama ile istediğiniz veriyi hızlıca bulun.',
      color: 'accent'
    },
    {
      icon: BarChart3,
      title: 'Görselleştirme',
      description: 'Verilerinizi interaktif grafikler ve haritalarla görselleştirin.',
      color: 'success'
    },
    {
      icon: Download,
      title: 'Kolay İndirme',
      description: 'Farklı formatlarda veri indirme ve API erişimi.',
      color: 'warning'
    },
    {
      icon: Shield,
      title: 'Güvenli Erişim',
      description: 'JWT tabanlı güvenli kimlik doğrulama ve yetkilendirme.',
      color: 'error'
    },
    {
      icon: Globe,
      title: 'Açık Standartlar',
      description: 'Uluslararası açık veri standartlarına uygun platform.',
      color: 'primary'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Ahmet Yılmaz',
      role: 'Veri Bilimci',
      organization: 'TÜİK',
      content: 'Bu platform sayesinde kamu verilerine çok daha kolay erişebiliyoruz. Analiz süreçlerimiz önemli ölçüde hızlandı.',
      rating: 5
    },
    {
      name: 'Ayşe Kaya',
      role: 'Araştırmacı',
      organization: 'Üniversite',
      content: 'Açık veri portalının kullanıcı dostu arayüzü ve zengin veri setleri araştırmalarımız için mükemmel.',
      rating: 5
    },
    {
      name: 'Mehmet Demir',
      role: 'Geliştirici',
      organization: 'Teknoloji Şirketi',
      content: 'API entegrasyonu çok kolay ve dokümantasyon mükemmel. Projelerimizde aktif olarak kullanıyoruz.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} loading={statsLoading} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Popular Datasets */}
      <PopularDataSets datasets={popularDatasets} loading={datasetsLoading} />

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage; 