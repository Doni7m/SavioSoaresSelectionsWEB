import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white dark:bg-neutral-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2 dark:text-white">About Savio Soares Selections</h2>
          <p className="text-gray-600 dark:text-gray-400">
            A dedication to authenticity, tradition, and the art of winemaking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-serif text-2xl mb-4 dark:text-white">Our Philosophy</h3>
            <p className="mb-4 dark:text-gray-300">
              Founded by Savio Soares in 2003, our company specializes in discovering exceptional wines from family-owned estates that honor traditional winemaking methods and deeply respect their terroir.
            </p>
            <p className="mb-4 dark:text-gray-300">
              We believe that the finest wines tell a story—one that reflects their origin, the dedication of their producers, and the cultural heritage behind each bottle. Our portfolio represents a carefully curated selection of wines that embody these values.
            </p>
            <p className="dark:text-gray-300">
              Every producer in our portfolio shares our commitment to sustainable agriculture and minimal intervention winemaking, ensuring that each wine authentically expresses its unique character.
            </p>
          </div>
          
          <div className="bg-about-pattern bg-cover bg-center p-10 text-white min-h-[720px] flex flex-col justify-center">
            <h3 className="font-serif text-2xl mb-6 relative">
              <span className="relative z-10">Savio's Expertise</span>
              <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-gold"></span>
            </h3>
            <p className="mb-4">
              With over 25 years of experience in the fine wine industry, Savio has developed relationships with some of the most respected winemakers across Europe and the Americas.
            </p>
            <p>
              His discerning palate and commitment to authenticity have earned him recognition among top sommeliers, importers, and fine dining establishments throughout the United States.
            </p>
            <a href="#contact" className="mt-6 border-b border-gold text-gold inline-block pb-1 hover:border-white hover:text-white transition-colors">
              Connect with our team
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 border-t-2 border-gold">
            <h4 className="font-serif text-xl mb-4 dark:text-white">Our Mission</h4>
            <p className="text-gray-700 dark:text-gray-300">
              To connect discerning buyers with authentic, terroir-driven wines that represent the pinnacle of their regions.
            </p>
          </div>
          
          <div className="text-center p-6 border-t-2 border-gold">
            <h4 className="font-serif text-xl mb-4 dark:text-white">Our Standards</h4>
            <p className="text-gray-700 dark:text-gray-300">
              We prioritize wines produced with integrity, from sustainable vineyards, with minimal intervention in both vineyard and cellar.
            </p>
          </div>
          
          <div className="text-center p-6 border-t-2 border-gold">
            <h4 className="font-serif text-xl mb-4 dark:text-white">Our Promise</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Every wine in our portfolio has been personally evaluated and selected by Savio to ensure exceptional quality and value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;