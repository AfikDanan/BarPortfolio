import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
}

// Constants moved outside component to avoid recreation on each render
const PROJECT_FOLDER_MAP: Record<string, string> = {
    '1': 'Bulwarx',
    '2': 'DroneChef',
    '3': 'ginegar',
    '4': 'IEC',
    '5': 'cyberint'
};

const IMAGE_VIEWER_HTML = (title: string, imagePath: string) => `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        img {
            max-width: 100vw;
            max-height: 100vh;
            object-fit: contain;
        }
    </style>
</head>
<body>
    <img src="${imagePath}" alt="${title}" />
</body>
</html>`;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const handleClick = () => {
        const folderName = PROJECT_FOLDER_MAP[project.id] || project.id;
        const projectImagePath = `/static/images/projects/${folderName}/${folderName}.png`;

        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(IMAGE_VIEWER_HTML(project.title, projectImagePath));
            newWindow.document.close();
        }
    };

    const displayedTools = project.tools.slice(0, 3);
    const remainingToolsCount = project.tools.length - 3;

    return (
        <div
            onClick={handleClick}
            className="group bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 cursor-pointer active:scale-95 md:hover:scale-105 hover:shadow-xl md:hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] touch-manipulation"
        >
            {/* Project Image */}
            <div className="relative mb-4 sm:mb-5 md:mb-6 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 h-40 sm:h-48 md:h-56">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs sm:text-sm">No preview available</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <span className="px-2 sm:px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                        {project.category.replace('-', ' ')}
                    </span>
                </div>
            </div>

            {/* Project Content */}
            <div className="flex flex-col flex-grow">
                <div className="flex-grow mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors h-10 sm:h-12 flex items-start leading-tight">
                        <span className="line-clamp-2">{project.title}</span>
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-4 sm:line-clamp-5 md:line-clamp-4 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Fixed bottom content */}
                <div className="space-y-2 sm:space-y-3 mt-auto">
                    {/* Project Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                            <Tag className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate text-right">{project.client}</span>
                        </div>
                    </div>

                    {/* Technologies - Mobile optimized */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                        {displayedTools.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md whitespace-nowrap">
                                {tech}
                            </span>
                        ))}
                        {remainingToolsCount > 0 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md whitespace-nowrap">
                                +{remainingToolsCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};