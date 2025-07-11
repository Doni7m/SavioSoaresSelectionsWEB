import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRegionsByCountry } from '../data/regions';

const PortfolioRegion: React.FC = () => {
  // Pegamos o countryId da URL
  const { countryId } = useParams<{ countryId: string }>();

  // Se o parâmetro não existir, não renderiza nada
  if (!countryId) return null;

  // Obtemos as regiões do país via função utilitária
  const { country, regions } = getRegionsByCountry(countryId);

  return (
    <main className="flex-grow py-32 bg-white dark:bg-neutral-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Link 
            to="/portfolio" 
            className="text-wine hover:text-wine-dark dark:text-gold dark:hover:text-gold-light mb-4 inline-block"
          >
            ← Back to Countries
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900 dark:text-white">{country?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {country?.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region) => (
            <Link
              key={region.id}
              to={`/portfolio/producers/${region.id}`}
              className="group block overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="font-serif text-2xl mb-2">{region.name}</h2>
                    <p className="text-gold">{region.producerCount} Producers</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PortfolioRegion;
