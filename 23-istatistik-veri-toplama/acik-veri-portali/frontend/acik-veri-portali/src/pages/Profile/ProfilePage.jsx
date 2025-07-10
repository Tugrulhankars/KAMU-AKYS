import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div className="pt-20 pb-12">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Profil
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Bu sayfa yakında eklenecek.
          </p>
          <Link
            to="/"
            className="btn-primary"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 