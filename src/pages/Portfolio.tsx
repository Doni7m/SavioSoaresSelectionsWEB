import React from 'react';
import { getCountries } from '../data/countries';

const Portfolio: React.FC = () => {
  const countries = getCountries();

  return (
    <main className="flex-grow py-32 bg-white dark:bg-neutral-900">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-900 dark:text-white">
          Our Portfolio
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <a
              key={country.id}
              href={`/portfolio/region/${country.id}`}
              className="group block overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="font-serif text-2xl mb-2">{country.name}</h2>
                    <p className="text-gold">{country.regionCount} Regions</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;