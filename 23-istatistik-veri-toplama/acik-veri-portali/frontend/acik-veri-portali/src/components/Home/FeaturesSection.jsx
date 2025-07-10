import React from 'react';

const FeaturesSection = ({ features }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Platform Özellikleri
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Açık veri portalımızın sunduğu gelişmiş özellikler ve avantajlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card-hover p-6 text-center group"
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-${feature.color}-200 transition-colors`}>
                  <Icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 