import React from 'react';
import { getProducersByRegion } from '../data/producers';
import { useParams, Link } from 'react-router-dom';


const ProducersList: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();

  if (!regionId) return null;

  const { region, producers } = getProducersByRegion(regionId);

  return (
    <main className="flex-grow py-32 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Link 
            to={`/portfolio/region/${region?.countryId}`} 
            className="text-wine dark:text-gold hover:text-wine-dark dark:hover:text-gold-light mb-4 inline-block"
          >
            ← Back to {region?.countryName}
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{region?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {region?.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {producers.map((producer) => (
            <Link
              key={producer.id}
              to={`/portfolio/producer/${producer.id}`}
              className="group relative overflow-hidden aspect-square rounded-lg"
            >
              <img
                src={producer.cardImage || producer.bannerImage || producer.wines[0]?.image || 'https://images.pexels.com/photos/2702805/pexels-photo-2702805.jpeg'}
                alt={producer.name}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <h2 className="font-serif text-2xl mb-2">{producer.name}</h2>
                  <p className="text-gold">{producer.wines.length} Wines</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProducersList;
