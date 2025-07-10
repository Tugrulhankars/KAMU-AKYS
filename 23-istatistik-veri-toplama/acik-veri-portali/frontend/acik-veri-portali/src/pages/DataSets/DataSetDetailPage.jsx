import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DataSetDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="pt-20 pb-12">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Veri Seti Detayı
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            ID: {id}
          </p>
          <p className="text-xl text-gray-600 mb-8">
            Bu sayfa yakında eklenecek.
          </p>
          <Link
            to="/datasets"
            className="btn-primary"
          >
            Veri Setlerine Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataSetDetailPage; 