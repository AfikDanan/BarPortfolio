import React from 'react';
import { Download, ArrowRight, Eye } from 'lucide-react';



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
    <section id="landing" className="min-h-screen bg-white flex items-center justify-center bg-opacity-10 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Bar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tal</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 font-medium">
              UX/UI Product Designer
            </h2>
          </div>

          {/* Main Value Proposition */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Turning complexity into clarity –
              <span className="font-semibold text-gray-900"> UX/UI for mission-critical systems</span>
            </p>
            <p className="text-md text-gray-600 mt-4">
              3 years of experience designing intuitive interfaces for cybersecurity and engineering platforms
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToProjects}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold 
                         transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center space-x-2"
            >

              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-300
                             hover:border-blue-500 hover:text-blue-600 transition-all duration-300
                             flex items-center space-x-2">
              <Download className="" />
              <a href='./static/BarTal.pdf' download>Download Resume</a>

            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-12 ">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">∞</div>
              <div className="text-sm text-gray-600">Cups of Coffee</div>
            </div>
          </div>
        </div>
        <div className="relative left-1/2 transform -translate-x-1/2 animate-bounce mt-16">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
};