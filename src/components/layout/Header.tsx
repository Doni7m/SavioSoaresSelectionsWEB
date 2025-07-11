import React, { useEffect, useState, useMemo } from 'react';
import { Menu, X, Grape, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { producers } from '../../data/producers';

interface LocationState {
  scrollTo?: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPortfolioPage, setIsPortfolioPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkPortfolioPage = () => {
      setIsPortfolioPage(window.location.pathname.includes('/portfolio'));
    };

    checkPortfolioPage();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', checkPortfolioPage);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', checkPortfolioPage);
    };
  }, []);

  useEffect(() => {
    // Scroll to section if state.scrollTo is set after navigation
    const state = location.state as LocationState | null;
    if (state && state.scrollTo) {
      const anchorId = state.scrollTo;
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state to prevent repeated scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const filteredProducers = useMemo(() => {
    if (!searchTerm) return [];
    const lowerTerm = searchTerm.toLowerCase();
    return producers.filter(p => p.name.toLowerCase().includes(lowerTerm));
  }, [searchTerm]);

  const handleSelectProducer = (producerId: string) => {
    setSearchTerm('');
    setShowDropdown(false);
    navigate(`/portfolio/producer/${producerId}`);
  };

  if (!mounted) return null;

  const getTextColor = () => {
    if (isPortfolioPage) {
      return isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-gray-200';
    }
    return isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white';
  };

  const getLinkColor = () => {
    if (isPortfolioPage) {
      return isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-wine dark:hover:text-gold' : 'text-gray-700 dark:text-gray-300 hover:text-wine dark:hover:text-gold';
    }
    return isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-wine dark:hover:text-gold' : 'text-white hover:text-gold';
  };

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
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-md py-3'
          : isPortfolioPage
          ? 'bg-white dark:bg-gray-900 py-6'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Grape className={`h-8 w-8 ${isScrolled || isPortfolioPage ? 'text-wine dark:text-gold' : 'text-gold'}`} />
          <span className={`ml-2 font-serif text-2xl font-semibold ${getTextColor()}`}>
            Savio Soares Selections
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative">
          <Link to="/" className={getLinkColor()}>Home</Link>
          <Link to="/portfolio" className={getLinkColor()}>Portfolio</Link>
          <a href="#about" className={getLinkColor()} onClick={(e) => handleAnchorClick(e, 'about')}>About</a>
          <a href="#contact" className={getLinkColor()} onClick={(e) => handleAnchorClick(e, 'contact')}>Contact</a>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search producers..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-wine dark:focus:ring-gold"
              style={{ width: '200px' }}
            />
            {showDropdown && filteredProducers.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
                {filteredProducers.map(producer => (
                  <li
                    key={producer.id}
                    className="px-3 py-2 cursor-pointer hover:bg-wine hover:text-white dark:hover:bg-gold dark:hover:text-gray-900"
                    onMouseDown={() => handleSelectProducer(producer.id)}
                  >
                    {producer.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full transition ${
              isScrolled || isPortfolioPage
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full transition ${
              isScrolled || isPortfolioPage
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled || isPortfolioPage ? 'text-wine dark:text-white' : 'text-white'} />
            ) : (
              <Menu className={isScrolled || isPortfolioPage ? 'text-wine dark:text-white' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 absolute top-full left-0 w-full shadow-md">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-800 dark:text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className="text-gray-800 dark:text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <a 
              href="#about" 
              className="text-gray-800 dark:text-gray-200 py-2"
              onClick={(e) => { handleAnchorClick(e, 'about'); setIsMenuOpen(false); }}
            >
              About
            </a>
          <a 
              href="#contact" 
              className="text-gray-800 dark:text-gray-200 py-2"
              onClick={(e) => { handleAnchorClick(e, 'contact'); setIsMenuOpen(false); }}
            >
              Contact
            </a>
            {/* Search Bar for Mobile Menu */}
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search producers..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-wine dark:focus:ring-gold"
              />
              {showDropdown && filteredProducers.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
                  {filteredProducers.map(producer => (
                    <li
                      key={producer.id}
                      className="px-3 py-2 cursor-pointer hover:bg-wine hover:text-white dark:hover:bg-gold dark:hover:text-gray-900"
                      onMouseDown={() => {
                        handleSelectProducer(producer.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      {producer.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
