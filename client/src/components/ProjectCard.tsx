import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {

    return (
        <div
            onClick={onClick}
            className="group bg-white backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full"
        >
            {/* Project Image */}
            <div className="relative mb-4 md:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 aspect-video">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Project Content - Flexible container */}
            <div className="flex flex-col flex-grow">
                {/* Title and Description - Takes available space */}
                <div className="flex-grow mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Fixed bottom content */}
                <div className="space-y-3 mt-auto">
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
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {project.tools.slice(0, 3).map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md whitespace-nowrap">
                                {tech}
                            </span>
                        ))}
                        {project.tools.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md whitespace-nowrap">
                                +{project.tools.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};