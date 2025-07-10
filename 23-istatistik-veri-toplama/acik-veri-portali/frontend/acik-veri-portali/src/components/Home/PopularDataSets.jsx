import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Download, Eye, Calendar } from 'lucide-react';

const PopularDataSets = ({ datasets, loading }) => {
  const defaultDatasets = [
    {
      id: 1,
      title: 'Nüfus İstatistikleri 2023',
      description: 'Türkiye geneli nüfus verileri ve demografik analizler',
      downloads: 1250,
      views: 3400,
      updatedAt: '2023-12-01',
      category: 'Demografi'
    },
    {
      id: 2,
      title: 'Ekonomik Göstergeler',
      description: 'GSYH, enflasyon, işsizlik ve diğer ekonomik veriler',
      downloads: 890,
      views: 2100,
      updatedAt: '2023-11-28',
      category: 'Ekonomi'
    },
    {
      id: 3,
      title: 'Eğitim İstatistikleri',
      description: 'Okul, öğrenci ve öğretmen sayıları',
      downloads: 650,
      views: 1800,
      updatedAt: '2023-11-25',
      category: 'Eğitim'
    }
  ];

  const displayDatasets = datasets?.data || defaultDatasets;

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popüler Veri Setleri
            </h2>
            <p className="text-xl text-gray-600">
              En çok indirilen ve görüntülenen veri setleri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popüler Veri Setleri
          </h2>
          <p className="text-xl text-gray-600">
            En çok indirilen ve görüntülenen veri setleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDatasets.map((dataset) => (
            <Link
              key={dataset.id}
              to={`/datasets/${dataset.id}`}
              className="card-hover p-6 block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {dataset.category}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dataset.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {dataset.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {dataset.downloads}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {dataset.views}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(dataset.updatedAt).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/datasets"
            className="btn-primary"
          >
            Tüm Veri Setlerini Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDataSets; 