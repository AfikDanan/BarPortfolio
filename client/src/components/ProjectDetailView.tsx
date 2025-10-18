import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailViewProps {
    project: Project;
    onBack: () => void;
    onImageClick: (imageUrl: string) => void;
    projects: Project[];
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
    project,
    onBack,
    onImageClick
}) => {
    // Convert preview image path to full image path
    const getFullImagePath = (previewPath: string) => {
        return previewPath.replace('_preview.png', '.png');
    };

    const fullImagePath = getFullImagePath(project.imageUrl);

    const handleImageClick = () => {
        onImageClick(fullImagePath);
    };

    return (
        <div className="min-h-screen bg-gray-50 project-detail-view">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 safe-area-padding project-detail-header">
                <div className="px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Back Button */}
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-gray-900 active:text-gray-900 transition-colors duration-200 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 touch-manipulation min-h-[44px]"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">Back</span>
                        </button>

                        {/* Project Title */}
                        <div className="text-right flex-1 ml-4 min-w-0">
                            <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                                {project.title}
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                {project.client} • {project.year}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-14 sm:pt-16">
                <div className="w-full">
                    {/* Image Container */}
                    <div className="bg-white">
                        <div className="w-full max-w-5xl mx-auto">
                            <img
                                src={fullImagePath}
                                alt={project.title}
                                className="w-full h-auto cursor-pointer transition-opacity duration-200 hover:opacity-95 active:opacity-90 touch-manipulation"
                                onClick={handleImageClick}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>

                    {/* Bottom Spacing */}
                    <div className="h-16 sm:h-20 bg-white"></div>
                </div>
            </main>
        </div>
    );
};