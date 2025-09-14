import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  const categories = ['All Projects', 'Mobile Apps', 'Web Design', 'Complex Systems'];

  const featuredProjects = projects.filter(project => project.featured);

  const filteredProjects = activeCategory === 'All Projects'
    ? featuredProjects
    : featuredProjects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Projects</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-16 mt-8 ">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-blue-500 text-black shadow-lg shadow-blue-500/25'
                  : 'bg-white/10 text-gray-500 hover:bg-white/20 hover:text-black'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick(project)}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Project Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 aspect-video">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white/60" />
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{project.client}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  {project.tools && project.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tools.slice(0, 3).map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md">
                          +{project.tools.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg">
              No featured projects found in "{activeCategory}" category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};