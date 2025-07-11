import React from 'react'
import { ChevronDown } from 'lucide-react'

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat flex items-center"
    >
      <div className="container-custom text-white dark:text-white">
        <div
          className="max-w-2xl animate-fadeInUp opacity-0"
          style={{ animationDelay: '300ms' }}
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight">
            Expressive Wines from Small Growers
          </h1>
          <p className="text-xl mb-8 font-light text-white dark:text-gray-200">
            Curated wines that reflect terroir, tradition, and passion.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/portfolio" className="btn-secondary">
              Explore Our Wines
            </a>
            <a
              href="#about"
              className="bg-transparent border-2 border-white dark:border-gray-300 text-white dark:text-gray-300 hover:bg-white hover:text-wine dark:hover:bg-gray-300 dark:hover:text-wine transition-all duration-300 btn"
            >
              About Our Selection
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white dark:text-gray-300 animate-bounce">
        <a
          href="#about"
          className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll to about section"
        >
          <span className="mb-2 text-sm font-light">Discover More</span>
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  )
}

export default HeroSection
