import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import Portfolio from './pages/Portfolio';
import PortfolioRegion from './pages/PortfolioRegion';
import PortfolioProducer from './pages/PortfolioProducer';
import ProducersList from './pages/ProducersList';

// Página Home agrupada
function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <div className="min-h-screen bg-cream dark:bg-neutral-900 text-gray-800 dark:text-gray-200 flex flex-col">
          <Header />
          <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/region/:countryId" element={<PortfolioRegion />} />
            <Route path="/portfolio/region/:regionId/producers" element={<ProducersList />} />
            <Route path="/portfolio/producers" element={<ProducersList />} />
            <Route path="/portfolio/producers/:regionId" element={<ProducersList />} />
            <Route path="/portfolio/producer/:producerId" element={<PortfolioProducer />} />
          </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
