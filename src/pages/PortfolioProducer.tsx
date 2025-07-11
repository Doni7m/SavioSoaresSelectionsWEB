import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducerById } from '../data/producers';
import WineDetailsPopup from '../components/wine/WineDetailsPopup';
import { Wine } from '../types';
// Removed apple-cards-carousel imports
import { Gallery4 } from "../components/ui/Gallery4";
import { Gallery4Wines } from "../components/ui/Gallery4Wines";

const PortfolioProducer: React.FC = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);

  if (!producerId) return null;

  const producer = getProducerById(producerId);

  if (!producer) {
    return (
      <main className="flex-grow pt-32 bg-white dark:bg-neutral-900">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif mb-6 text-gray-900 dark:text-white">Producer Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The producer you're looking for could not be found.
          </p>
          <Link to="/portfolio" className="btn-primary">Return to Portfolio</Link>
        </div>
      </main>
    );
  }

  // Transform wines to Gallery4WineItem format
  const wineGalleryItems = producer.wines.map((wine) => ({
    id: wine.id,
    title: wine.name,
    description: wine.description,
    href: "#", // Could be updated to a wine detail page if available
    image: wine.image,
  }));

  const galleryItems = (producer.midia || [])
    .filter((url) => url.trim() !== "")
    .map((image, index) => ({
      id: `${producer.id}-img-${index}`,
      title: producer.name,
      description: producer.region,
      href: "#",
      image,
    }));

  const handleWineClick = (id: string) => {
    const wine = producer.wines.find((w) => w.id === id);
    if (wine) {
      setSelectedWine(wine);
    }
  };

  return (
    <main className="flex-grow pt-20 bg-white dark:bg-neutral-900">
      <div 
        className="h-[60vh] bg-cover bg-center relative overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${producer.bannerImage || producer.wines[0]?.image || 'https://images.pexels.com/photos/2702805/pexels-photo-2702805.jpeg'})` 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
          <div className="max-w-3xl">
            <div className="mb-4">
              <Link 
                to={`/portfolio/producers/${producer.regionId}`} 
                className="text-gold hover:text-gold-light transition-colors"
              >
                {producer.region}
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">{producer.name}</h1>
          </div>
        </div>
      </div>
      {galleryItems.length > 0 && (
          <div className="max-w-6xl mx-auto mb-0">
            <Gallery4
              title={`${producer.name} Gallery`}
              description={`Explore photos of ${producer.name}'s vineyards, cellars and winemaking process.`}
              items={galleryItems}
            />
          </div>
        )}

      <div className="max-w-6xl mx-auto mb-0">
        <h2>History & Heritage:</h2>
      </div>

      <div className="container-custom py-4">
        <div className="max-w-3xl mx-auto mb-1">
          <p
            className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
            style={{ whiteSpace: "pre-line" }}
          >
            {producer.description}
          </p>
        </div>

        <Gallery4Wines
          title={`${producer.name} Wines`}
          description={`Explore the wines produced by ${producer.name}.`}
          items={wineGalleryItems}
          onWineClick={handleWineClick}
        />
      </div>

      {selectedWine && (
        <WineDetailsPopup 
          wine={selectedWine} 
          onClose={() => setSelectedWine(null)} 
        />
      )}
    </main>
  );
};

export default PortfolioProducer;
