import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { CompanyLogosCarousel } from './CompanyLogosCarousel';



interface LandingSectionProps {
  onSectionClick: (section: string) => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onSectionClick }) => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionClick('projects');
    }
  };

  return (
    <section id="landing" className="min-h-screen bg-white flex items-center justify-center bg-opacity-10 py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 animate-fade-in">
          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight pt-4">
              Bar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tal</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
              UX/UI Product Designer
            </h2>
          </div>

          {/* Main Value Proposition */}
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Turning complexity into clarity –
              <span className="font-semibold text-gray-900"> UX/UI for mission-critical systems</span>
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-3">
              3 years of experience designing intuitive interfaces for cybersecurity and engineering platforms
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={scrollToProjects}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold 
                         transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center space-x-2"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300
                             hover:border-blue-500 hover:text-blue-600 transition-all duration-300
                             flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <a href='./static/BarTal.pdf' download>Download Resume</a>
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto pt-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">3+</div>
              <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">15+</div>
              <div className="text-xs sm:text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">∞</div>
              <div className="text-xs sm:text-sm text-gray-600">Cups of Coffee</div>
            </div>
          </div>

          {/* Company Logos Carousel */}
          <div className="pt-6">
            <div className="relative w-full max-w-4xl mx-auto">
              <CompanyLogosCarousel />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative left-1/2 transform -translate-x-1/2 animate-bounce mt-8">
          <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-1 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};