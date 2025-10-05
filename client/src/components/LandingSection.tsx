import React from 'react';
import { Download, ArrowRight } from 'lucide-react';




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
    <section id="landing" className="min-h-screen bg-white flex items-center justify-center bg-opacity-10 py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Main Headline */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight pt-4">
              Bar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tal</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
              UX/UI Product Designer
            </h2>
          </div>

          {/* Main Value Proposition */}
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed pb-6 sm:pb-8">
              <span className="font-semibold text-gray-900">Crafting exceptional user experiences for complex systems</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto px-4">
            <button
              onClick={scrollToProjects}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                         px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base
                         transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center justify-center space-x-2 w-full sm:w-auto touch-manipulation"
            >
              <span className="whitespace-nowrap">View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href='./static/Bar Tal CV.pdf'
              download
              className="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold 
                         text-sm sm:text-base border-2 border-gray-300
                         hover:border-blue-500 hover:text-blue-600 transition-all duration-300
                         flex items-center justify-center space-x-2 w-full sm:w-auto touch-manipulation"
            >
              <Download className="w-4 h-4" />
              <span className="whitespace-nowrap">Download Resume</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator - Centered */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <div className="animate-bounce">
            <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-gray-400 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};