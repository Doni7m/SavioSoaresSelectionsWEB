import React, { useState } from 'react';
import { Wine, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // New function to handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on homepage, scroll to section
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with state to scroll after navigation
      navigate('/', { state: { scrollTo: anchorId } });
    }
  };

  return (
    <footer className="bg-wine text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Wine className="h-8 w-8 text-gold" />
              <span className="ml-2 font-serif text-xl font-semibold">Savio Soares Selections</span>
            </div>
            <p className="text-gray-300 mb-6">
              Expressive Wines from Small Growers
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4 font-medium">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-gold transition-colors" onClick={(e) => handleAnchorClick(e, 'home')}>Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-gold transition-colors" onClick={(e) => handleAnchorClick(e, 'about')}>About Us</a></li>
              <li><a href="#portfolio" className="text-gray-300 hover:text-gold transition-colors" onClick={(e) => handleAnchorClick(e, 'portfolio')}>Wine Portfolio</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-gold transition-colors" onClick={(e) => handleAnchorClick(e, 'contact')}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4 font-medium">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold mr-2 mt-0.5" />
                <span className="text-gray-300">
                  1140 Broadway, STE 207<br />
                  New York, NY 10001, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold mr-2" />
                <a href="tel:+718-797-4114" className="text-gray-300 hover:text-gold transition-colors">
                  +1 (718) 797-4114
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold mr-2" />
                <a href="mailto:office@savioselections.com" className="text-gray-300 hover:text-gold transition-colors">
                  office@savioselections.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Savio Soares Selections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
