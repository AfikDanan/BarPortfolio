import React, { useState } from 'react';
import { Download, Menu, X, Shield, User } from 'lucide-react';


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

  const sections = [
    { id: 'landing', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'companies', label: 'Companies' },
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
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">Bar Tal</span>

            {currentSection !== 'landing' && (
              <div className="flex items-center justify-center px-4">
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold border-2 border-gray-300
                             hover:border-blue-500 hover:text-blue-600 transition-all duration-300
                             flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <a href="./static/BarTal.pdf" download>Download CV</a>

                </button>
              </div>
            )}
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors duration-200 ${currentSection === section.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {section.label}
              </button>
            ))}

            {/* Admin Toggle */}
            <button
              onClick={onAdminToggle}
              className={`p-2 rounded-lg transition-colors duration-200 ${isAdmin
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <Shield className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <button
              onClick={onAdminToggle}
              className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${isAdmin
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
            >
              Admin Panel
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};