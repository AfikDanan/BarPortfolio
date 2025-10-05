import React, { useState, useMemo } from 'react';
import { Tag } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { CompanyLogosCarousel } from './CompanyLogosCarousel';

interface ProjectsSectionProps {
  projects: Project[];
}

const CATEGORY_LABELS = {
  'All Projects': 'All Projects',
  'web': 'Web Design',
  'mobile': 'Mobile Apps',
  'complex-systems': 'Complex Systems'
} as const;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  // Reset to "All Projects" on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // md breakpoint
        setActiveCategory('All Projects');
      }
    };

    // Check on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize expensive calculations
  const { categories, filteredProjects } = useMemo(() => {
    const featured = projects.filter(project => project.featured);

    const cats = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
      key,
      label,
      count: key === 'All Projects'
        ? featured.length
        : featured.filter(p => p.category === key).length
    }));

    const filtered = activeCategory === 'All Projects'
      ? featured
      : featured.filter(project => project.category === activeCategory);

    return { categories: cats, filteredProjects: filtered };
  }, [projects, activeCategory]);

  const activeLabel = categories.find(c => c.key === activeCategory)?.label || activeCategory;

  return (
    <section id="projects" className="py-6 sm:py-8 md:py-14 px-3 sm:px-4 md:px-6 bg-white bg-opacity-20">
      <div className="max-w-6xl mx-auto">
        <CompanyLogosCarousel />

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Projects</h2>



          {/* Desktop Category Filter */}
          <div className="hidden md:flex flex-wrap justify-center gap-4 mb-8 md:mb-16">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.key
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 hover:transform hover:scale-102'
                  }`}
                disabled={category.count === 0 && category.key !== 'All Projects'}
              >
                <span className="flex items-center gap-2">
                  {category.label}
                  <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === category.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                    }`}>
                    {category.count}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-2">
              <div className="text-gray-900">
                <span className="text-sm sm:text-base md:text-lg font-semibold">{activeLabel}</span>
                <span className="text-gray-600 ml-2 text-xs sm:text-sm md:text-base">
                  ({filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''})
                </span>
              </div>

              {activeCategory !== 'All Projects' && (
                <button
                  onClick={() => setActiveCategory('All Projects')}
                  className="text-blue-400 hover:text-blue-300 active:text-blue-500 text-xs sm:text-sm transition-colors duration-200 px-2 py-1 rounded touch-manipulation"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 px-4">
              No featured projects found in "{activeLabel}" category.
            </p>
            <button
              onClick={() => setActiveCategory('All Projects')}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base touch-manipulation"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};