import React, { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailView } from './ProjectDetailView';
import { ImageModal } from './ImageModal';
import { CompanyLogosCarousel } from './CompanyLogosCarousel';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);



  // Categories with counts
  const categories = [
    { key: 'All Projects', label: 'All Projects', count: projects.filter(p => p.featured).length },
    { key: 'web', label: 'Web Design', count: projects.filter(p => p.featured && p.category === 'web').length },
    { key: 'mobile', label: 'Mobile Apps', count: projects.filter(p => p.featured && p.category === 'mobile').length },
    { key: 'complex-systems', label: 'Complex Systems', count: projects.filter(p => p.featured && p.category === 'complex-systems').length }
  ];

  // Handle keyboard and click events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else if (expandedProject) {
          setExpandedProject(null);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedImage, expandedProject]);

  const featuredProjects = projects.filter(project => project.featured);
  const filteredProjects = activeCategory === 'All Projects'
    ? featuredProjects
    : featuredProjects.filter(project => project.category === activeCategory);

  const handleCategoryChange = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    setSelectedImage(null);
  };

  const handleProjectClick = (projectId: string) => {
    setExpandedProject(projectId);
    setSelectedImage(null);
  };

  const handleBackToProjects = () => {
    setExpandedProject(null);
    setSelectedImage(null);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleImageModalClose = () => {
    setSelectedImage(null);
  };

  const expandedProjectData = projects.find(p => p.id === expandedProject);

  return (
    <section id="projects" className="py-14 px-6 bg-white  bg-opacity-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full max-w-6xl mx-auto">
          <CompanyLogosCarousel />
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Projects</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-16">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
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
            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-900">
                <span className="text-lg font-semibold">
                  {activeCategory === 'All Projects' ? 'All Projects' : categories.find(c => c.key === activeCategory)?.label}
                </span>
                <span className="text-gray-600 ml-2">
                  ({filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''})
                </span>
              </div>

              {activeCategory !== 'All Projects' && (
                <button
                  onClick={() => handleCategoryChange('All Projects')}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 text-lg mb-6">
              No featured projects found in "{categories.find(c => c.key === activeCategory)?.label || activeCategory}" category.
            </p>
            <button
              onClick={() => handleCategoryChange('All Projects')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {expandedProject && expandedProjectData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleBackToProjects}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectDetailView
              project={expandedProjectData}
              onBack={handleBackToProjects}
              onImageClick={handleImageClick}
              projects={projects}
            />
          </div>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        onClose={handleImageModalClose}
      />
    </section>
  );
}