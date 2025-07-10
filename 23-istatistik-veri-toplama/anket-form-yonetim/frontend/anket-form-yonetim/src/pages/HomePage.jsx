import React from 'react';
import SurveyList from '../components/SurveyList';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="border-t pt-8 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mevcut Anketler</h2>
        <SurveyList />
      </div>
    </div>
  );
};

export default HomePage; 