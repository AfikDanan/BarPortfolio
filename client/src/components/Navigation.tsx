import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';


interface NavigationProps {
  isAdmin: boolean;
  onAdminToggle: () => void;
  onSectionClick: (section: string) => void;
  currentSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  isAdmin,
  onAdminToggle,
  onSectionClick,
  currentSection
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const landingSection = document.getElementById('landing');
      const landingHeight = landingSection ? landingSection.offsetHeight : window.innerHeight;

      if (currentScrollY < 100) {
        // Always show navbar at top
        setIsVisible(true);
      } else if (currentSection !== 'landing') {
        // Always show navbar when not in landing section
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > landingHeight * 0.8) {
        // Scrolling down and past 80% of landing - hide navbar
        setIsVisible(false);
        setIsOpen(false); // Close mobile menu when hiding
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, currentSection]);

  const sections = [
    { id: 'landing', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionClick(sectionId);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-200 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Download CV Button */}
          <div className="flex items-center min-w-0">
            {currentSection !== 'landing' && (
              <a
                href="./static/Bar Tal CV.pdf"
                download
                className="bg-white text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium border-2 border-gray-300
                           hover:border-blue-500 hover:text-blue-600 transition-all duration-300
                           flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm touch-manipulation shrink-0"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap sm:hidden">CV</span>
                <span className="whitespace-nowrap hidden sm:inline">Download CV</span>
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors duration-200 py-2 whitespace-nowrap ${currentSection === section.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 touch-manipulation shrink-0"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${currentSection === section.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};